# Ocean Blue Design Refactor Script
# This script applies the Ocean Blue design system to all remaining pages

$files = @(
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\missions\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\nabung-bareng\[id]\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\history\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\profil\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\vaults\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\solo\cash-secured-put\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\solo\covered-call\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\solo\buy-call\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\solo\buy-put\page.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing: $file"
        $content = Get-Content $file -Raw
        
        # 1. Update background gradient
        $content = $content -replace 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900', 'relative min-h-screen bg-gradient-to-br from-[#0A4A7C] via-[#0284C7] to-[#06B6D4]'
        
        # 2. Update card backgrounds
        $content = $content -replace 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50', 'bg-white/15 backdrop-blur-md border-2 border-white/20'
        $content = $content -replace 'bg-slate-700/30 border border-slate-600/30', 'bg-white/10 border-2 border-white/20'
        $content = $content -replace 'bg-slate-700/50', 'bg-white/10'
        
        # 3. Update text colors
        $content = $content -replace 'text-slate-300(?![\w-])', 'text-white/90'
        $content = $content -replace 'text-slate-400(?![\w-])', 'text-white/70'
        
        # 4. Update primary buttons
        $content = $content -replace 'bg-gradient-to-r from-purple-600 to-blue-600', 'bg-gradient-to-r from-[#FFBC57] to-[#FF9500]'
        $content = $content -replace 'bg-gradient-to-r from-blue-600 to-purple-600', 'bg-gradient-to-r from-[#FFBC57] to-[#FF9500]'
        
        # 5. Update icon colors
        $content = $content -replace 'text-blue-400(?![\w-])', 'text-[#00FFF0]'
        $content = $content -replace 'bg-blue-500/20', 'bg-[#0284C7]/20'
        $content = $content -replace 'text-purple-400(?![\w-])', 'text-[#A855F7]'
        $content = $content -replace 'bg-purple-500/20', 'bg-[#A855F7]/20'
        
        # 6. Update modal backgrounds
        $content = $content -replace 'bg-slate-900/80 backdrop-blur-sm', 'bg-[#0A4A7C]/80 backdrop-blur-sm'
        $content = $content -replace 'bg-slate-800 rounded', 'bg-white/15 backdrop-blur-md rounded'
        
        # 7. Update borders
        $content = $content -replace 'border-slate-700/50', 'border-white/20'
        $content = $content -replace 'border-slate-600/30', 'border-white/20'
        $content = $content -replace 'border-slate-600/50', 'border-white/20'
        
        Set-Content $file -Value $content -NoNewline
        Write-Host "✓ Updated: $file"
    } else {
        Write-Host "✗ Not found: $file"
    }
}

Write-Host "`n✅ Batch refactor complete!"
Write-Host "Note: Manual review recommended for complex components"
