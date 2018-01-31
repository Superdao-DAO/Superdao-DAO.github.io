
    //Prices feed
    prices = {
      btc_sup: 0.000551,
      usd_sup: '',
      sup_eth: '',
      eth_sup: '',
      btc_eth: 0.01432806,
      usd_btc: 682.9,
      mkt_cap: '',
      tkn_prc: ''
    };
    price_api = 'https://min-api.cryptocompare.com/data/price';
    //price_api = 'https://www.cryptocompare.com/api/data/price';

    function updatePrices() {
      var base_price = 0.0465617596; //Promissory token rate
      var newprices = {};
      newprices.btc_eth = prices.btc_eth;
      newprices.sup_eth = base_price;//Implement promissory token rate
      newprices.btc_sup = prices.btc_sup = newprices.sup_eth * newprices.btc_eth;
      newprices.usd_btc = prices.usd_btc;
      newprices.eth_sup = parseFloat((prices.btc_eth / prices.btc_sup).toFixed(6));
      newprices.usd_sup = parseFloat((prices.usd_btc * prices.btc_sup).toFixed(4));
      newprices.mkt_cap = parseInt((100000000 * newprices.usd_sup).toFixed(0));
      newprices.tkn_prc = TOKEN_DISCOUNT_PRICE = (newprices.sup_eth * 0.6).toFixed(9);
      prices = newprices;
      var pairs = Object.keys(newprices);

      for (i in pairs) {
        //remove mkt Cap for now
        if (pairs[i] === 'mkt_cap') {
          continue;
        }
        var spans = document.getElementsByClassName(pairs[i]);
        for (s = 0; s < spans.length; s++) {
          spans[s].innerText = ' ' + prices[pairs[i]];
        }
      }
    }

    function getPrices() {
      var err = 0;
      $.get(price_api+'?fsym=ETH&tsyms=BTC')
      .then(
        function (d) {
          if (Object.keys(d).length < 1) {
            err++;
            return;
          }
          prices.btc_eth = parseFloat(d['BTC']).toFixed(6);
          $.get(price_api+'?fsym=BTC&tsyms=USD')
          .then(
            function (d) {
              if (Object.keys(d).length < 1) {
                err++;
                return;
              }
              prices.usd_btc = parseFloat(d['USD']).toFixed(2);
              updatePrices();
            },
            function () {
            });
        },
        function (e) {
        });
    }

    $(function () {
      updatePrices();
      getPrices();
      setInterval(
        function () {
          getPrices();
        }, 30000);
    });
