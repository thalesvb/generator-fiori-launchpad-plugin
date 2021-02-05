Humble (and abandoned from day 1) Fiori Launchpad Plugin generator
===

It is coded as a run-once generator to scaffold a Launchpad Plugin project and provides the following extension samples:

* Header
* Footer
* Action Button

It also provides a bare minimum scaffolding to connect into a backend server.
It's up to you to address any other missing thing that you need (probably a lot more than you expect).

Very important notices that you must read now or you'll regret it later
---

This was created for personal use and up until now I was using locally with ``npm link`` trick. I've seen more questions popping up about Launchpad Plugin after WebIDE trial shutdown, that's why I'm publishing it (since walkthrough is only helpful if you already have a working Launchpad Plugin project).

This follows Apache "It works" principle: bare minimum generator and that's it. Any add-on beyond Launchpad Plugin code must be done by you. Time to test your JavaScript and Documentation Reading skills, and buff them up.

This generator **DOES NOT PROVIDE** any kind of help to things listed below and **it is up to you** to work it out:

* Deployment infrastructure
* Mock server/page
* Unit testing

The project may also not run out-of-the-box if your ui5cli is not globally installed. You can either globall install or adjust package.json (read NPM documentation)

**Call it inside an empty folder**. I didn't bother to handle writing into a subfolder, it will output project files into *current working directory*.

**Do not call it again on an existing project, it WILL overwrite files.**

Don't create hope, this project is managed as abandonware because it already does what I need: a working Launchpad Plugin.

Feel free to fork and provide a better generator.
___
Are you still here? Congratulations!!! Welcome aboard!

