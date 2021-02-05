"use strict";
const Generator = require("yeoman-generator");
const glob = require("glob");

module.exports = class extends Generator {
  async prompting() {
    const deviceTypes = [
      { name: "Desktop", value: "desktop" },
      { name: "Tablet", value: "tablet" },
      { name: "Phone", value: "phone" }
    ];

    const prompts = [
      {
        type: "input",
        name: "projectName",
        message: "How do you want to name this project (Project ID)?",
        default: "flpPlugin"
      },
      {
        type: "input",
        name: "namespace",
        message: "Which namespace do you want to use (Project Namespace)?",
        default: "com.example"
      },
      {
        type: "confirm",
        name: "headerTemplate",
        message: "Would you like a header extension sample?",
        default: true
      },
      {
        type: "confirm",
        name: "footerTemplate",
        message: "Would you like a footer extension sample?",
        default: true
      },
      {
        type: "confirm",
        name: "actionButtonTemplate",
        message: "Would you like a button in options bar extension sample?",
        default: true
      },
      {
        type: "checkbox",
        name: "deviceTypes",
        message: "For what device types this plugin should be enabled?",
        choices: deviceTypes,
        default: deviceTypes.map(type => type.value)
      }
    ];

    const backendSettings = [
      {
        type: "confirm",
        name: "configBackend",
        message: "Would you like to scaffold backend connection?",
        default: false
      },
      /* {
        type: 'input',
        name: 'server',
        message: 'Backend server:'
      }, */
      {
        type: "input",
        name: "path",
        message:
          "Backend path (must NOT include base path, ie. http(s)://myserver.com):"
      }
    ];

    this.props = await this.prompt(prompts);
    if ((await this.prompt(backendSettings[0])).configBackend) {
      this.backend = await this.prompt(backendSettings.slice(1));
    }
  }

  _generateConfig() {
    const oConfig = {
      backend: null
    };
    Object.assign(oConfig, this.props);
    if (this.backend) {
      oConfig.backend = {};
      Object.assign(oConfig.backend, this.backend);
    }

    ["desktop", "tablet", "phone"].forEach(type => {
      oConfig.deviceTypes[type] = this.props.deviceTypes.includes(type);
    });
    return oConfig;
  }

  writing() {
    const oConfig = this._generateConfig();
    glob
      .sync("**", {
        cwd: this.sourceRoot(),
        nodir: true
      })
      .forEach(file => {
        const sOrigin = this.templatePath(file);
        const sTarget = this.destinationPath(
          file.replace(/^_/, "").replace(/\/_/, "/")
        );
        this.fs.copyTpl(sOrigin, sTarget, oConfig);
      });
  }

  install() {}
};
