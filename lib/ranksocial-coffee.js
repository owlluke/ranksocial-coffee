'use babel';

import RanksocialCoffeeView from './ranksocial-coffee-view';
import { CompositeDisposable } from 'atom';

export default {

  ranksocialCoffeeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ranksocialCoffeeView = new RanksocialCoffeeView(state.ranksocialCoffeeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ranksocialCoffeeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ranksocial-coffee:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ranksocialCoffeeView.destroy();
  },

  serialize() {
    return {
      ranksocialCoffeeViewState: this.ranksocialCoffeeView.serialize()
    };
  },

  toggle() {
    console.log('RanksocialCoffee was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
