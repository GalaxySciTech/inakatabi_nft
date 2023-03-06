import BigNumber from 'bignumber.js';

const $number = (val = 1) => {
    return new BigNumber(val);
};

const $shiftedBy = (data, decimals, acc = 1) => {
    if (!data) return 0;
    decimals = Number(decimals);
    return Number($number(data).shiftedBy(decimals).toFixed(acc, 1));
};
const $shiftedByString = (data, decimals, acc = 4) => {
    if (!data) return 0;
    decimals = Number(decimals);
    return $number(data).shiftedBy(decimals).toFixed(acc);
};
export const $shiftedByFixed = (data, decimals, acc = 4, round = 1) => {
    if (!data) return 0;
    decimals = Number(decimals);
    return $number(data).shiftedBy(decimals).sd(acc, round).toFixed();
  };
const $shiftedByZero = (data, decimals, acc) => {
    if (!data) return 0;
    const val = $number(data).shiftedBy(decimals).toFixed();
    console.log('$shiftedByZero', val, val.indexOf('.'));
    const t = val.split('.')[1];
    if (val.indexOf('.') !== -1) {
        let i = 0;
        let num = 0;
        for (i; i < t.length; i++) {
            if (t.charAt(i) !== '0') {
                break;
            } else {
                num++;
            }
        }
        return num >= 5 ? `${val.split('.')[0]}.0{${num}}${t.substring(num, acc ? acc + num : t.length)}` : $number(val).toFixed(8, 1);
    } else {
        return $number(val).toFixed(8, 1);
    }
};
const $shiftedByToBig = (data, decimals) => {
    if (!data) return 0;
    decimals = Number(decimals);
    return $number(data).shiftedBy(decimals).toFixed();
};

const $toFixed = (data, acc) => {
    if ((!data && data != 0) || String(data).indexOf('--') != -1) return '--';
    return Number($number(data).toFixed(acc, 1));
};
const $hash = (txHash, length = 4, lastLength = 6) => {
    if (!txHash) {
        return '--';
    }
    if (!lastLength) lastLength = length;
    return txHash.substring(0, length) + '...' + txHash.substring(txHash.length - lastLength, txHash.length);
};
const $numberFormat = val => {
    let num = val;
    val = Number(val);
    if (val > 1000000) {
        num = Number((val / 1000000).toFixed(2)) + 'M';
    } else if (val > 1000) {
        num = Number((val / 1000).toFixed(2)) + 'K';
    }
    return num;
};

// input val filter
const $filterNumber = e => {
    function clearNoNum(val) {
        // 先把非数字的都替换掉，除了数字和.
        val = val.replace(/[^\d.]/g, '');

        // 保证只有出现一个.而没有多个.
        val = val.replace(/\.{2,}/g, '.');

        // 必须保证第一个为数字而不是.
        val = val.replace(/^\./g, '');

        // 保证.只出现一次，而不能出现两次以上
        val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');

        return val;
    }
    e.target.value = clearNoNum(e.target.value);
};

const $filterNumberVal = value => {
    function clearNoNum(val) {
        // 先把非数字的都替换掉，除了数字和.
        val = val.replace(/[^\d.]/g, '');

        // 保证只有出现一个.而没有多个.
        val = val.replace(/\.{2,}/g, '.');

        // 必须保证第一个为数字而不是.
        val = val.replace(/^\./g, '');

        // 保证.只出现一次，而不能出现两次以上
        val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');

        return val;
    }
    return clearNoNum(value);
};

export const $dealTimes = endTime => {
    // var difftime = new Date(endTime).getTime() - new Date().getTime();
    var difftime = endTime - new Date().getTime();
    if (difftime > 0) {
        var days = Math.floor(difftime / (24 * 3600 * 1000));
        var leave1 = difftime % (24 * 3600 * 1000);
        var hours = Math.floor(leave1 / (3600 * 1000));

        var leave2 = leave1 % (3600 * 1000);
        var minutes = Math.floor(leave2 / (60 * 1000));

        var leave3 = leave2 % (60 * 1000);
        var seconds = Math.round(leave3 / 1000);
        return {
            days,
            hours,
            minutes,
            seconds,
        };
    } else {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }
};

const $copy = text => {
    try {
        var textArea = document.createElement('textarea');
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            console.log(successful);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
        document.body.removeChild(textArea);
        // message.success('Copy Successfully')
        return Promise.resolve();
    } catch (e) {
        console.error('copy error', e);
        return Promise.reject();
    }
};

export { $number, $numberFormat, $shiftedBy, $shiftedByToBig, $copy, $toFixed, $hash, $shiftedByString, $shiftedByZero, $filterNumber, $filterNumberVal };
