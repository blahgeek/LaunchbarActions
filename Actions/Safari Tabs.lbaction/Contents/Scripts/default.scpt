-- This handler is called when the user runs the action:
on run
	set tabList to {}
	set rtnVal to {}
	
	tell application "Safari"
		set winlist to every window
		repeat with win in winlist
			log name of win
			set ok to true
			try
				set tabList to every tab of win
			on error errmsg
				set ok to false
			end try
			if ok then
				repeat with t in tabList
					try
						set rtnVal to rtnVal & {{title:(name of t as string), subtitle:(URL of t as string), action:"selectTab", actionArgument:(id of win as string) & "." & (index of t as string)}}
						--display dialog name of t as string
					end try
				end repeat
			end if
		end repeat
	end tell
	return rtnVal
end run

on selectTab(_tabString)
	set AppleScript's text item delimiters to "."
	set tmp to text items of (_tabString as string)
	set w to (item 1 of tmp) as integer
	set t to (item 2 of tmp) as integer
	tell application "LaunchBar" to hide
	tell application "System Events"
		tell process "Safari"
			set frontmost to true
			perform action "AXRaise" of window 1
		end tell
	end tell
	tell application "Safari"
		try
			activate window w
			set index of window id w to 1
		on error errmsg
			log errmsg
		end try
		try
			set current tab of window id w to tab t of window id w
		on error errmsg
			log errmsg
		end try
	end tell
end selectTab