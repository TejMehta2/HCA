/* eslint-disable */
import { NavigableComponent } from 'components/Navigation/TableOfContents/TableOfContents.types';
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

    if (!navTitle || componentParams?.ExcludeFromTableOfContents === '1') {
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

    if (exists || typeof window === 'undefined') {
      return componentAnchorId;
    }

    this.list.push(navItem);
    this.emit('navigableComponentsListUpdated', this.list);
    return componentAnchorId;
  }

  getList(): NavigableComponent[] {
    return this.list;
  }

  clearList(): void {
    this.list = [];
    this.emit('navigableComponentsListUpdated', this.list);
  }
}

export const inPageNavGlobalStore = new InPageNavGlobalStore();
