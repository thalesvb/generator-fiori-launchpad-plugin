"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-fiori-launchpad-plugin:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({});
  });

  it("creates files", () => {
    assert.file(["package.json", "ui5.yaml"]);
    assert.file(
      [
        "manifest.json",
        "flpSandbox.html",
        "Component.js",
        "i18n/i18n.properties",
        "appconfig/fioriSandboxConfig.json"
      ].map(file => "webapp/" + file)
    );
  });
});
