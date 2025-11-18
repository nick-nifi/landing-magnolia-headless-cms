import CreatePagePlugin from "@magnolia/cli-create-page-plugin";
import CreateComponentPlugin from "@magnolia/cli-create-component-plugin";
import CreateVirtualUriPlugin from "@magnolia/cli-create-virtual-uri-plugin";
import CreateRestEndpointPlugin from "@magnolia/cli-create-rest-endpoint-plugin";
import CreateContentTypePlugin from "@magnolia/cli-create-content-type-plugin";
import CreateAppPlugin from "@magnolia/cli-create-app-plugin";
import CreateLightModulePlugin from "@magnolia/cli-create-light-module-plugin";
import StartPlugin from "@magnolia/cli-start-plugin";
export default {
  analytics: {
    enabled: true,
    // Set to false to turn off analytics
    uuid: "39877de5-8693-458f-9ed0-28b2f26d7db5"
  },
  // Logger configuration
  // see: https://github.com/winstonjs/winston#logging for logging levels explanation
  logger: {
    filename: './mgnl.error.log',
    fileLevel: 'debug',
    consoleLevel: 'info'
  },
  // Here you can add plugins you want to use with MGNL CLI
  plugins: [new CreatePagePlugin({
      framework: '@magnolia/cli-react-prototypes',
      templateArgs: {
        removeExtension: true
      },
      templateData: {
        port: '8181'
      }
    }), new CreateComponentPlugin({
      framework: '@magnolia/cli-react-prototypes',
      templateArgs: {
        removeExtension: true
      }
    }), new CreateVirtualUriPlugin(),
    new CreateRestEndpointPlugin(),
    new CreateContentTypePlugin(),
    new CreateAppPlugin(),
    new CreateLightModulePlugin(),
    new StartPlugin({
      tomcatPath: './.magnolia/apache-tomcat'
    })
  ],
  type: "tsx",
  lightModulesPath: "./light-modules",
  lightModule: "spa-lm",
  componentMappingFilePath: "./spa/src/magnolia.config.ts",
  componentsSpaPath: "./spa/src/app/templates/components",
  pagesSpaPath: "./spa/src/app/templates/pages"
};
