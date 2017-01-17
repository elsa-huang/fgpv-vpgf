/* global RV */
(() => {
    // define english/french translations for use inside plugin
    const translations = {
        'en-CA': {
            cartButtonLabel: 'Back to Cart'
        },

        'fr-CA': {
            cartButtonLabel: 'Retour au panier'
        }
    };

    class BackToCart extends RV.BasePlugins.MenuItem {

        set catalogURL (url) {
            this._catalogURL = url.replace('{RV_LAYER_LIST}', this.api.getRcsLayerIDs().toString());
        }

        get catalogURL () { return this._catalogURL; }

        /**
         * Returns a function to be executed when the link is clicked.
         * @return  {Function}    Callback to be executed when link is clicked
         */
        onMenuItemClick () {
            return () => {
                // save bookmark in local storage so it is restored when user returns
                sessionStorage.setItem(this.api.appInfo.id, this.api.getBookmark());
                window.location.href = this.catalogURL;
            };
        }

        init (catalogURL) {
            this.catalogURL = catalogURL;
            this.name = 'cartButtonLabel';
            this.translations = translations;
            this.action = this.onMenuItemClick();
        }
    }

    // Register this plugin with global plugins namespace
    RV.Plugins.BackToCart = BackToCart;
})();
