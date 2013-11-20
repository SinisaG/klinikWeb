klinikWeb
=========

1. Server setup
	- Go to https://manage.windowsazure.com/@bizsparkhackandcraft.onmicrosoft.com
	- Click new and create new virtual machine
	- When adding certificate add *.pem
	- Wait until server is created
	- Go to azureserverprep project and run fab script with PYTHON_PATH/fab.exe -H hostname -u username(azureuser) -i pathtocertificate (azureuser.key) setup --> this should install everything we need on the server and create user www-data
2. Project scaffold
	- Create github rep (if we choose git ignore for python files, we can exclude some stuff from committing, that we need)
	- For project scaffold we have 2 options.
	1. Take the most lightweight project we have and copy the stuff we need. We start with creating folder deploy (we can copy the deploy script) and webapp
		- go to folder webapp and crate(copy) local, dev, live ini, also setup.py and __init__. Create a folder with project name (in our case klinik)
		- go to project name folder and create folder static, templates and views (also common if needed).
		- go to static folder. We create admin and web folder, one is for admin tool and second for webapp. Inside we putt bootstrap less files. We create less folder, where we put cachebuster and main less file(s). In folder scripts, we have libs.js, where we put the libraries we need. This si also godd place for fonts folder and other scripts.
		- In common folder we have some classic libraries and models.
		- In templates, we have project templates
		- In views we have pyramid views
		In our case we took teh setup from project Bonaverde.
	2. We can create pyramid default project scaffold and take it from there.
3. Env setup
	For setting up the env, we add the deployment key to github project. That is public key from www-data user. Then we go to deploy fodler nad run fab script
		pythonpathc\fab.exe -H host -u www-data -i user_privete_key_path create_env:env={enviorment_name}
	And afterwards we run pythonpathc\fab.exe -H host -u www-data -i user_privete_key_path deploy:env={enviorment_name}
	That should set up the env.
	We choose a domain for the project. And run pythonpathc\fab.exe -H host -u azureuser -i user_privete_key_path add_nginx_domain_config
	This will prompt for basic setup.
	The last thing to do is to setup hudson. Copy existing job and set the hook in github to trigger the build. 