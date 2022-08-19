/*
 * Public API Surface of fusio-sdk
 */

export * from './lib/abstract/detail';
export * from './lib/abstract/list';
export * from './lib/abstract/modal';

export * from './lib/component/empty/empty.component';
export * from './lib/component/help/help.component';
export * from './lib/component/message/message.component';
export * from './lib/component/scopes/scopes.component';
export * from './lib/component/search/search.component';
export * from './lib/component/sidebar/sidebar.component';

export * from './lib/guard/authentication.guard';

export * from './lib/service/factory.service';
export * from './lib/service/help.service';
export * from './lib/service/user.service';

export * from './lib/fusio-sdk.module';

declare global {
  var FUSIO_URL: string | undefined;
}
