#!/usr/bin/env python
#
# LaunchBar Action Script
#
import json
import re
import subprocess

hs_output = subprocess.check_output(["/usr/local/bin/hs", "-c", ""])
json_output = re.search(r'{.*}', hs_output)
if json_output is None:
    json_output = []
else:
    json_output = json.loads(json_output.group(0))

items = []

for action in json_output:
    items.append({
        'title': json_output[action],
        'url': 'hammerspoon://' + action,
        'subtitle': 'hammerspoon://' + action,
        'icon': 'org.hammerspoon.Hammerspoon',
    })

print json.dumps(items)
