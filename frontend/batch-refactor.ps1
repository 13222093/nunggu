# Batch refactor script for remaining pages
$ErrorActionPreference = "Stop"

$files = @(
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\nabung-bareng\[id]\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\solo\cash-secured-put\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\solo\covered-call\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\solo\buy-call\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\solo\buy-put\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\history\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\profil\page.tsx",
    "c:\Users\Ari Azis\Hackathon2025\nunggu\frontend\app\vaults\page.tsx"
)

$replacements = @{
    # Background
    'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' = 'relative min-h-screen bg-gradient-to-br from-[#0A4A7C] via-[#0284C7] to-[#06B6D4]'
    
    # Cards
    'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50' = 'bg-white/15 backdrop-blur-md border-2 border-white/20'
    'bg-slate-700/30 border border-slate-600/30' = 'bg-white/10 border-2 border-white/20'
    'bg-slate-700/50' = 'bg-white/10'
    'bg-slate-800/30' = 'bg-white/10'
    
    # Buttons - Primary
    'bg-gradient-to-r from-purple-600 to-blue-600' = 'bg-gradient-to-r from-[#FFBC57] to-[#FF9500]'
    'bg-gradient-to-r from-blue-600 to-purple-600' = 'bg-gradient-to-r from-[#FFBC57] to-[#FF9500]'
    'hover:from-purple-700 hover:to-blue-700' = 'hover:from-[#FF9500] hover:to-[#FFBC57]'
    
    # Buttons - Secondary
    'border-2 border-slate-600 text-slate-300' = 'border-2 border-white/40 text-white'
    'hover:bg-slate-700/30' = 'hover:bg-white/10'
    
    # Text colors
    'text-slate-300' = 'text-white/90'
    'text-slate-400' = 'text-white/70'
    'text-slate-500' = 'text-white/50'
    
    # Icon colors
    'text-blue-400' = 'text-[#00FFF0]'
    'bg-blue-500/20' = 'bg-[#0284C7]/20'
    'text-purple-400' = 'text-[#A855F7]'
    'bg-purple-500/20' = 'bg-[#A855F7]/20'
    'text-yellow-400' = 'text-[#FFBC57]'
    'bg-yellow-500/20' = 'bg-[#FFBC57]/20'
    
    # Gradients
    'bg-gradient-to-br from-purple-500 to-blue-500' = 'bg-gradient-to-br from-[#0284C7] to-[#06B6D4]'
    'bg-gradient-to-r from-purple-500 to-blue-500' = 'bg-gradient-to-r from-[#A855F7] to-[#06B6D4]'
    
    # Modal
    'bg-slate-900/80 backdrop-blur-sm' = 'bg-[#0A4A7C]/80 backdrop-blur-sm'
    
    # Borders
    'border-slate-700/50' = 'border-white/20'
    'border-slate-600/30' = 'border-white/20'
    'border-slate-600/50' = 'border-white/20'
    
    # Progress bars
    'bg-slate-600/30' = 'bg-white/20'
    'bg-slate-700/50' = 'bg-white/20'
    
    # Special cards
    'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20' = 'bg-white/15 backdrop-blur-md border-2 border-white/20'
}

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing: $file" -ForegroundColor Cyan
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Apply all replacements
        foreach ($key in $replacements.Keys) {
            $content = $content -replace [regex]::Escape($key), $replacements[$key]
        }
        
        # Add radial overlay after background if not present
        if ($content -match 'relative min-h-screen bg-gradient-to-br from-\[#0A4A7C\]' -and 
            $content -notmatch 'radial-gradient') {
            $content = $content -replace '(relative min-h-screen bg-gradient-to-br from-\[#0A4A7C\] via-\[#0284C7\] to-\[#06B6D4\][^>]*>)', 
                '$1`r`n        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,152,255,0.3),transparent_50%)] animate-pulse" />`r`n        `r`n        <div className="relative z-10'
            $content = $content -replace '(<div className="max-w-[^"]*mx-auto)', '</div>`r`n        $1'
        }
        
        Set-Content $file -Value $content -NoNewline -Encoding UTF8
        Write-Host "✓ Updated: $file" -ForegroundColor Green
    } else {
        Write-Host "✗ Not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n✅ Batch refactor complete!" -ForegroundColor Green
