!(function(window, document, _) {
    window.TenKey = function(className) {
        var className = typeof className !== 'undefined' ?  className : 'ten-key';
        var tenKeys = document.getElementsByClassName(className);
    
        var tenkeyTemplate = _.template((function () {/*
            <table id="<%= id %>">
                <tbody>
                    <tr><td colspan="2" id="close">X</td></tr>
                    <tr><td id="tenkey-7">7</td><td id="tenkey-8">8</td><td id="tenkey-9">9</td></tr>
                    <tr><td id="tenkey-8">4</td><td id="tenkey-5">5</td><td id="tenkey-6">6</td></tr>
                    <tr><td id="tenkey-1">1</td><td id="tenkey=2">2</td><td id="tenkey-3">3</td></tr>
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
            if (elm.uuid !== undefined) return;

            var uuid = getUniqueStr();
            elm.uuid = uuid;

            var div = document.createElement('div');
            div.innerHTML = tenkeyTemplate({'id': uuid});

            div.addEventListener('click', function(ev) {
                switch(true) {
                    case ev.target.id === 'close':
                        end({'target': elm});
                        break;
                    case ev.target.id.startsWith('tenkey-'):
                        var num = ev.target.id.slice(-1);
                        elm.value += num;
                    default:
                }
            });

            elm.parentNode.insertBefore(div, elm.nextSibling); 
            div.focus();
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


