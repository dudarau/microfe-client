# MICRO FE
A naive micro frontend infrastructure. This project intends to provide necessary tooling 
to achieve independent apps loaded separately and run on different parts on single web page.
For detailed information on the topic can be found [micro-frontends.org](https://micro-frontends.org/)
This repository will conduct some experiments to achieve the goal. The experiments has following
goals;
 * isolate completely different apps developed completely different tech stacks.
 * create an asynchronous dependency injection for inter micro app dependencies.
 * isolate css
 * provide a way for loading assets from css or from html
 * create a structure for consumable micro apps
## Motivation
When developing micro services there a re lots of tools and libraries to helps developers
to focus the effort on the architecture instead of details. Since micro frontend idea is
for now premature and it needs time to grow. My intention is to contribute to this discussion.
And also provide necessary tooling and a sample architecture for developers. The ultimate 
goal is making the developers and the companies life easier who are willing to adapt this
architecture.
## Requirements
When you clone or download the project to your local, run following code to start the app
````bash
npm install
npm start
````
