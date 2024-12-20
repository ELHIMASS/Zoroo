# moto_loc
PS C:\Users\ADS\Desktop\moto_loc> git pull
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (3/3), 831 bytes | 43.00 KiB/s, done.
   180ecbc..9f28db9  main       -> origin/main
Updating 180ecbc..9f28db9
Fast-forward
 index.html | 49 ++++++++++++++++++++++++++-----------------------
 moto_loc   |  1 +
 2 files changed, 27 insertions(+), 23 deletions(-)
 create mode 160000 moto_loc
PS C:\Users\ADS\Desktop\moto_loc> git pull
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 1), reused 3 (delta 1), pack-reused 0 (from 0)
From https://github.com/ELHIMASS/moto_loc
   9f28db9..5b2a9a0  main       -> origin/main
Updating 9f28db9..5b2a9a0
Fast-forward
 style.css | 89 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 89 insertions(+)
 create mode 100644 style.css
PS C:\Users\ADS\Desktop\moto_loc> git pull
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 5 (delta 1), reused 5 (delta 1), pack-reused 0 (from 0)
Unpacking objects: 100% (5/5), 46.22 KiB | 311.00 KiB/s, done.
From https://github.com/ELHIMASS/moto_loc
   5b2a9a0..b7110d3  main       -> origin/main
Updating 5b2a9a0..b7110d3
 motodet.html |  33 +++++++++++++++++++++++++++++++++
 motolog.png  | Bin 0 -> 48945 bytes
 motos.html   |  35 +++++++++++++++++++++++++++++++++++
 3 files changed, 68 insertions(+)
 create mode 100644 motodet.html
 create mode 100644 motolog.png
 create mode 100644 motos.html
PS C:\Users\ADS\Desktop\moto_loc> git pull
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (1/1), done.
Unpacking objects: 100% (3/3), 264 bytes | 12.00 KiB/s, done.
   b7110d3..5c01f0e  main       -> origin/main
Updating b7110d3..5c01f0e
Fast-forward
 README.md | 6 ------
 1 file changed, 6 deletions(-)
PS C:\Users\ADS\Desktop\moto_loc> git pull
Already up to date.
PS C:\Users\ADS\Desktop\moto_loc> git pull 
Already up to date.
PS C:\Users\ADS\Desktop\moto_loc> 
 *  History restored 

PS C:\Users\ADS\Desktop\moto_loc> 
 *  History restored 

PS C:\Users\ADS\Desktop\moto_loc> git checkout main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
PS C:\Users\ADS\Desktop\moto_loc> git add .
PS C:\Users\ADS\Desktop\moto_loc> git commit -m "ok"       
[main f66fbc1] ok
 1 file changed, 1 insertion(+), 1 deletion(-)
PS C:\Users\ADS\Desktop\moto_loc> git push
Enumerating objects: 5, done.
Delta compression using up to 4 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 298 bytes | 99.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To https://github.com/ELHIMASS/moto_loc.git
   5c01f0e..f66fbc1  main -> main
PS C:\Users\ADS\Desktop\moto_loc> git pull
There is no tracking information for the current branch.
Please specify which branch you want to merge with.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> future/Abdelfettah

PS C:\Users\ADS\Desktop\moto_loc> git branch --set-upstream-to=origin/<branch> future/Abdelfettah
fatal: the requested upstream branch 'origin/<branch>' does not exist
hint:
hint: branch that already exists at the remote, you may need to
hint: run "git fetch" to retrieve it.
hint:
hint: If you are planning to push out a new local branch that
hint: will track its remote counterpart, you may want to use
hint: "git push -u" to set the upstream config as you push.
hint: Disable this message with "git config advice.setUpstreamFailure false"
PS C:\Users\ADS\Desktop\moto_loc> git pull
There is no tracking information for the current branch.
Please specify which branch you want to merge with.

If you wish to set tracking information for this branch you can do so with:


PS C:\Users\ADS\Desktop\moto_loc> git checkout -b future/Abdelfettah
fatal: a branch named 'future/Abdelfettah' already exists
PS C:\Users\ADS\Desktop\moto_loc> git add .
PS C:\Users\ADS\Desktop\moto_loc> git commit -m "branch F"
On branch future/Abdelfettah
nothing to commit, working tree clean
PS C:\Users\ADS\Desktop\moto_loc> git push
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin future/Abdelfettah

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.

PS C:\Users\ADS\Desktop\moto_loc> git push --set-upstream origin future/Abdelfettah
remote:
remote: Create a pull request for 'future/Abdelfettah' on GitHub by visiting:
remote:      https://github.com/ELHIMASS/moto_loc/pull/new/future/Abdelfettah
remote:
To https://github.com/ELHIMASS/moto_loc.git
 * [new branch]      future/Abdelfettah -> future/Abdelfettah
branch 'future/Abdelfettah' set up to track 'origin/future/Abdelfettah'.
PS C:\Users\ADS\Desktop\moto_loc> git push
Everything up-to-dateg