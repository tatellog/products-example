#!/bin/bash

function err_msg {
	echo
	echo " ❌  $1"
	echo
}

localModules="'(\.+\/|$(ls -d src/*/ | sed -e 's/src//' -e 's/\///g' | xargs | sed 's/\s/|/g'))"

# Check for relative imports
echo " ... Checking relative imports in JS files"
find src -name "*.js" | xargs grep -nP 'import.*\.\./\.\./'
if [ "$?" == "0" ]; then
	err_msg "Found relative imports"
	exit 1
fi

# Check for individual styles
echo " ... Checking individual styles imports in JS files"
find src -name "*.js" | xargs grep -nP "import.*'.[\w\/\.]+/styles'"
if [ "$?" == "0" ]; then
	err_msg "Found shared styles. Style files has to be on the same dir and not be shared"
	exit 1
fi

# Check import blocks
echo " ... Checking import blocks in JS files"
ec=0 #error count
for JSFILE in $(find src -name "*.js"); do
	# Max 2 import blocks
	b=$(grep -A1 --no-group-separator -e "import.*" -e "^} from '.*'" $JSFILE | grep -c '^$')
	if [ "$b" -gt "2" ]; then
		echo "• $b import blocks in file (max=2):"
		echo "  $JSFILE"
		echo
		ec=$((ec+1))
	fi
	
	# If only one block, it should be all local or all external
	if [ "$b" -eq "1" ]; then
		grep -e "import.*'.*'" -e "^} from '.*'" $JSFILE | grep -v -q -P "$localModules"
		hasExternal=$?
		grep -e "import.*'.*'" -e "^} from '.*'" $JSFILE | grep -q -P "$localModules"
		hasLocal=$?
		if [ "$hasExternal" -eq "0" ] && [ "$hasLocal" -eq "0" ]; then
			echo "• Single import block with both local and external modules in file:"
			echo "  $JSFILE"
			echo
			ec=$((ec+1))
		fi
	fi

	# If 2 blocks, check external modules are imported on the 1st block and local modules on 2nd block
	if [ "$b" -eq "2" ]; then
		fl=$(grep -A1 --no-group-separator -e "import.*'.*'" -e "^} from '.*'" $JSFILE | grep -v '^  ' | grep -B1 -A1 --no-group-separator -P "$localModules" | head -n 1)
		if [ "$fl" != "" ]; then
			echo "• Local modules are imported on the first block in file:"
			echo "  $JSFILE"
			echo
			ec=$((ec+1))
		fi

		fl=$(grep -A1 --no-group-separator -e "import.*'.*'" -e "^} from '.*'" $JSFILE | grep -v '^  ' | grep -v -P "$localModules" | cat -s | grep -c '^$')
		if [ "$fl" == "2" ]; then
			echo "• External modules are imported on the second block in file:"
			echo "  $JSFILE"
			echo
			ec=$((ec+1))
		fi
	fi
done
if [ "$ec" -gt "0" ]; then
	err_msg "Found errors on import blocks in $ec JS files"
	exit 1
fi

echo
echo " ✔️   Other rules look good to me"
echo
