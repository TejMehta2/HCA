/* eslint-disable */
import { NavigableComponent } from 'components/TableOfContents/TableOfContents.types';
import EventEmitter from 'events';
import { generateHtmlSafeId } from 'lib/utility-functions/generateHtmlSafeId';
import Params from 'src/types/params';

class InPageNavGlobalStore extends EventEmitter {
  private list: NavigableComponent[] = [];

  addItem(
    componentParams: Params | undefined,
    componentTitle: string | undefined
  ): string {
    const navTitle =
      componentParams?.TableOfContentsLinkTitle || componentTitle;

    if (!navTitle || componentParams?.ExcludeFromTableOfContents) {
      return '';
    }

    const componentAnchorId = generateHtmlSafeId(navTitle);

    const navItem: NavigableComponent = {
      TableOfContentsLinkTitle: navTitle,
      Id: componentAnchorId,
    };

    const exists = this.list.some(
      (existingItem) => existingItem.Id === navItem.Id
    );

    console.log('exists', exists);
    console.log('navItem', navItem.TableOfContentsLinkTitle);

    if (exists || typeof window === 'undefined') {
      return componentAnchorId;
    }

    this.list.push(navItem);
    this.emit('navigableComponentsListUpdated', this.list);
    console.log('this.list', this.list);
    return componentAnchorId;
  }

  getList(): NavigableComponent[] {
    console.log('this.list', this.list);
    return this.list;
  }

  clearList(): void {
    console.log('[InPageNavGlobalStore] List cleared');
    this.list = [];
    this.emit('navigableComponentsListUpdated', this.list);
  }
}

export const inPageNavGlobalStore = new InPageNavGlobalStore();
