for i in $(cat hack/modules.list)
do 
    git submodule add https://github.com/spinalcom/$i src/$i
done