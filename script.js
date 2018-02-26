!(function(window, document, _) {
    var tapevent = 'ontouchstart' in window ? 'touchend' : 'click';

    window.TenKey = function(className) {
        var className = typeof className !== 'undefined' ?  className : 'ten-key';
        var tenKeys = document.getElementsByClassName(className);
    
        var tenkeyTemplate = _.template((function () {/*
            <table id="<%= id %>" style="position: absolute; background-color: white;">
                <tbody class="table">
                    <tr scope="row"><td id="tenkey-close" colspan="4" style="text-align:right;">X</td></tr>
                    <tr scope="row"><td>&nbsp;</td><td id="tenkey-/">/</td><td id="tenkey-*">*</td><td id="tenkey-backspace">BS</td></tr>
                    <tr scope="row"><td id="tenkey-7">7</td><td id="tenkey-8">8</td><td id="tenkey-9">9</td><td id="tenkey--">-</td></tr>
                    <tr scope="row"><td id="tenkey-4">4</td><td id="tenkey-5">5</td><td id="tenkey-6">6</td><td id="tenkey-+">+</td></tr>
                    <tr scope="row"><td id="tenkey-1">1</td><td id="tenkey=2">2</td><td id="tenkey-3">3</td><td id="tenkey-enter">↓</td></tr>
                </tbody>
            </table>
        */}).toString().match(/(?:\/\*(?:[\s\S]*?)\*\/)/).pop().replace(/^\/\*/, "").replace(/\*\/$/, ""));

        _.chain(tenKeys)
            .filter(function(elm) {
                return elm.tagName.toUpperCase() == "INPUT"
            })
            .each(function(elm) {
                elm.addEventListener('focus', startUp);
            });

        function startUp(e) {
            var elm = e.target;
            elm.blur(); // TODO キーボードは完全に抑止される。
            if (elm.uuid !== undefined) return;

            var uuid = getUniqueStr();
            elm.uuid = uuid;

            var div = document.createElement('div');
            div.style.display = "inline";
            div.style.position = "relative";
            div.innerHTML = tenkeyTemplate({'id': uuid});

            div.addEventListener(tapevent, function(ev) {
                switch(ev.target.id.replace('tenkey-', '')) {
                    case 'close':
                        end({'target': elm});
                        return;
                    case 'backspace':
                        elm.value = elm.value.slice(0, -1);
                        break;
                    case 'enter':
                        break;
                    default:
                        var num = ev.target.id.slice(-1);
                        elm.value += num;
                        break;
                }
            });

            elm.parentNode.insertBefore(div, elm.nextSibling);
        }

        function end(e) {
            var id = e.target.uuid;
            e.target.uuid = undefined;
            document.getElementById(id).remove();
        }
    };

    function getUniqueStr(myStrong){
        var strong = 1000;
        if (myStrong) strong = myStrong;
        return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
    }
})(window, document, _);


