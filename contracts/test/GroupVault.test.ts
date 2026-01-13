import { expect } from "chai";
import { ethers } from "hardhat";
import { GroupVault, MockERC20, MockAave } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("GroupVault", function () {
    let vault: GroupVault;
    let usdc: MockERC20;
    let aave: MockAave;
    let owner: SignerWithAddress;
    let admin: SignerWithAddress;
    let member1: SignerWithAddress;
    let member2: SignerWithAddress;
    let member3: SignerWithAddress;
    let mockOptionBook: SignerWithAddress;

    const INITIAL_BALANCE = ethers.parseUnits("100000", 6); // 100k USDC
    const DEPOSIT = ethers.parseUnits("1000", 6); // 1000 USDC

    beforeEach(async function () {
        [owner, admin, member1, member2, member3, mockOptionBook] = await ethers.getSigners();

        // Deploy Mock USDC
        const MockERC20Factory = await ethers.getContractFactory("MockERC20");
        usdc = await MockERC20Factory.deploy("USD Coin", "USDC", 6);
        await usdc.waitForDeployment();

        // Deploy Mock Aave
        const MockAaveFactory = await ethers.getContractFactory("MockAave");
        aave = await MockAaveFactory.deploy();
        await aave.waitForDeployment();

        // Deploy GroupVault
        const VaultFactory = await ethers.getContractFactory("GroupVault");
        vault = await VaultFactory.deploy(
            mockOptionBook.address,
            await usdc.getAddress(),
            await aave.getAddress(),
            owner.address
        );
        await vault.waitForDeployment();

        // Mint USDC to users
        await usdc.mint(admin.address, INITIAL_BALANCE);
        await usdc.mint(member1.address, INITIAL_BALANCE);
        await usdc.mint(member2.address, INITIAL_BALANCE);
        await usdc.mint(member3.address, INITIAL_BALANCE);

        // Approve vault
        await usdc.connect(admin).approve(await vault.getAddress(), INITIAL_BALANCE);
        await usdc.connect(member1).approve(await vault.getAddress(), INITIAL_BALANCE);
        await usdc.connect(member2).approve(await vault.getAddress(), INITIAL_BALANCE);
        await usdc.connect(member3).approve(await vault.getAddress(), INITIAL_BALANCE);
    });

    describe("Group Creation", function () {
        it("Should create a group with initial deposit", async function () {
            await vault.connect(admin).createGroup("Grup Test", DEPOSIT);

            const group = await vault.getGroup(0);
            expect(group.name).to.equal("Grup Test");
            expect(group.admin).to.equal(admin.address);
            expect(group.totalDeposited).to.equal(DEPOSIT);
            expect(group.memberCount).to.equal(1);
            expect(group.isActive).to.be.true;
        });

        it("Should track admin as first member", async function () {
            await vault.connect(admin).createGroup("Grup Test", DEPOSIT);

            const contribution = await vault.getMemberContribution(0, admin.address);
            expect(contribution).to.equal(DEPOSIT);
        });

        it("Should increment group ID", async function () {
            await vault.connect(admin).createGroup("Grup 1", DEPOSIT);
            await vault.connect(member1).createGroup("Grup 2", DEPOSIT);

            const group1 = await vault.getGroup(0);
            const group2 = await vault.getGroup(1);

            expect(group1.name).to.equal("Grup 1");
            expect(group2.name).to.equal("Grup 2");
        });
    });

    describe("Join Group", function () {
        beforeEach(async function () {
            await vault.connect(admin).createGroup("Grup Test", DEPOSIT);
        });

        it("Should allow user to join group", async function () {
            await vault.connect(member1).joinGroup(0, DEPOSIT);

            const group = await vault.getGroup(0);
            expect(group.memberCount).to.equal(2);
            expect(group.totalDeposited).to.equal(DEPOSIT * 2n);
        });

        it("Should track member contribution", async function () {
            const memberDeposit = ethers.parseUnits("500", 6);
            await vault.connect(member1).joinGroup(0, memberDeposit);

            const contribution = await vault.getMemberContribution(0, member1.address);
            expect(contribution).to.equal(memberDeposit);
        });

        it("Should calculate member share correctly", async function () {
            await vault.connect(member1).joinGroup(0, DEPOSIT); // 50% each

            const adminShare = await vault.getMemberShare(0, admin.address);
            const member1Share = await vault.getMemberShare(0, member1.address);

            expect(adminShare).to.equal(5000); // 50% in basis points
            expect(member1Share).to.equal(5000);
        });

        it("Should not allow joining twice", async function () {
            await vault.connect(member1).joinGroup(0, DEPOSIT);
            await expect(
                vault.connect(member1).joinGroup(0, DEPOSIT)
            ).to.be.revertedWith("Already member");
        });

        it("Should not exceed max members", async function () {
            // Fill up to MAX_MEMBERS (10)
            const signers = await ethers.getSigners();
            for (let i = 0; i < 9; i++) {
                await usdc.mint(signers[i + 6].address, DEPOSIT);
                await usdc.connect(signers[i + 6]).approve(await vault.getAddress(), DEPOSIT);
                await vault.connect(signers[i + 6]).joinGroup(0, DEPOSIT);
            }

            const group = await vault.getGroup(0);
            expect(group.memberCount).to.equal(10);

            // Try to add one more
            await usdc.mint(signers[16].address, DEPOSIT);
            await usdc.connect(signers[16]).approve(await vault.getAddress(), DEPOSIT);
            await expect(
                vault.connect(signers[16]).joinGroup(0, DEPOSIT)
            ).to.be.revertedWith("Group full");
        });
    });

    describe("Deposits", function () {
        beforeEach(async function () {
            await vault.connect(admin).createGroup("Grup Test", DEPOSIT);
            await vault.connect(member1).joinGroup(0, DEPOSIT);
        });

        it("Should allow additional deposits", async function () {
            const additionalDeposit = ethers.parseUnits("500", 6);
            await vault.connect(member1).deposit(0, additionalDeposit);

            const contribution = await vault.getMemberContribution(0, member1.address);
            expect(contribution).to.equal(DEPOSIT + additionalDeposit);
        });

        it("Should not allow non-members to deposit", async function () {
            await expect(
                vault.connect(member2).deposit(0, DEPOSIT)
            ).to.be.revertedWith("Not a member");
        });
    });

    describe("Voting", function () {
        beforeEach(async function () {
            await vault.connect(admin).createGroup("Grup Test", DEPOSIT);
            await vault.connect(member1).joinGroup(0, DEPOSIT);
            await vault.connect(member2).joinGroup(0, DEPOSIT);
        });

        it("Should allow member to create proposal", async function () {
            const data = ethers.AbiCoder.defaultAbiCoder().encode(
                ["address", "uint256"],
                [member1.address, DEPOSIT]
            );

            await vault.connect(member1).createProposal(0, 1, data); // WITHDRAW type

            const proposal = await vault.proposals(0);
            expect(proposal.groupId).to.equal(0);
            expect(proposal.proposalType).to.equal(1); // WITHDRAW
        });

        it("Should allow members to vote", async function () {
            const data = ethers.AbiCoder.defaultAbiCoder().encode(
                ["address", "uint256"],
                [member1.address, DEPOSIT]
            );
            await vault.connect(member1).createProposal(0, 1, data);

            await vault.connect(admin).vote(0, true);
            await vault.connect(member2).vote(0, false);

            const proposal = await vault.proposals(0);
            expect(proposal.votesFor).to.equal(1);
            expect(proposal.votesAgainst).to.equal(1);
        });

        it("Should not allow double voting", async function () {
            const data = "0x";
            await vault.connect(member1).createProposal(0, 1, data);
            await vault.connect(admin).vote(0, true);

            await expect(
                vault.connect(admin).vote(0, true)
            ).to.be.revertedWith("Already voted");
        });

        it("Should not allow non-members to vote", async function () {
            const data = "0x";
            await vault.connect(member1).createProposal(0, 1, data);

            await expect(
                vault.connect(member3).vote(0, true)
            ).to.be.revertedWith("Not a member");
        });
    });

    describe("View Functions", function () {
        beforeEach(async function () {
            await vault.connect(admin).createGroup("Grup Test", DEPOSIT);
            await vault.connect(member1).joinGroup(0, DEPOSIT);
        });

        it("Should return group members", async function () {
            const members = await vault.getGroupMembers(0);
            expect(members.length).to.equal(2);
            expect(members[0]).to.equal(admin.address);
            expect(members[1]).to.equal(member1.address);
        });

        it("Should return user groups", async function () {
            await vault.connect(admin).createGroup("Grup 2", DEPOSIT);

            const groups = await vault.getUserGroups(admin.address);
            expect(groups.length).to.equal(2);
        });

        it("Should return group positions", async function () {
            const positions = await vault.getGroupPositions(0);
            expect(positions.length).to.equal(0); // No positions yet
        });
    });

    describe("Admin Functions", function () {
        it("Should allow platform owner to update fee", async function () {
            await vault.connect(owner).updatePlatformFee(1000);
            expect(await vault.platformFee()).to.equal(1000);
        });

        it("Should not allow non-owner to update fee", async function () {
            await expect(
                vault.connect(member1).updatePlatformFee(1000)
            ).to.be.revertedWith("Not owner");
        });

        it("Should allow pause/unpause", async function () {
            await vault.connect(owner).pause();
            expect(await vault.paused()).to.be.true;

            await vault.connect(owner).unpause();
            expect(await vault.paused()).to.be.false;
        });
    });
});
