#!/usr/bin/env python
#
# LaunchBar Action Script
#
import json
import subprocess

hs_output = subprocess.check_output(["/usr/local/bin/hs", "-c", ""])
hs_output = json.loads(hs_output)

items = []

for action in hs_output:
    items.append({
        'title': hs_output[action],
        'url': 'hammerspoon://' + action,
        'icon': 'org.hammerspoon.Hammerspoon',
    })

print json.dumps(items)
