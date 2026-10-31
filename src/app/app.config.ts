import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {ApiService as SDK} from "../../projects/fusio-sdk/src/lib/service/api.service";
import {ApiService} from "./api.service";

import {routes} from './app.routes';
import {ConfigBuilder} from "./config-builder";
import {provideMarkdown} from "ngx-markdown";
import {provideAgentChatTypes} from "../../projects/fusio-sdk/src/lib/provider/agent-chat-registry.provider";
import {NGX_MONACO_EDITOR_CONFIG} from "ngx-monaco-editor-v2";
import {PathLocationStrategy} from "@angular/common";
import {FUSIO_CONFIG} from "../../projects/fusio-sdk/src/lib/config/config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAgentChatTypes(),
    provideMarkdown(),
    {
      provide: SDK,
      useExisting: ApiService
    },
    {
      provide: FUSIO_CONFIG,
      useValue: ConfigBuilder.build()
    },
    {
      provide: NGX_MONACO_EDITOR_CONFIG,
      useFactory: () => {
        const location = inject(PathLocationStrategy);

        return {
          baseUrl: window.location.origin + location.getBaseHref() + 'assets/monaco/min/vs',
        };
      }
    }
  ]
};
