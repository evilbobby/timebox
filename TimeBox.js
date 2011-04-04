// Complex Object for handling TimeBox shorthand
var TimeBox = {
    error: function (msg) {
		// add any custom error display here
        alert(msg);
    },
    wireSelectAllOnFocus: function (txtBoxID) {
        $("#" + txtBoxID).focus(function () {
            this.select();
        });
    },
    wireFormatTimeInput: function (txtBoxID) {
        TimeBox.wireSelectAllOnFocus(txtBoxID);
        $("#" + txtBoxID).change(function () {
            var $txtTimeInput = $(this);
            var rawTimeInput = $txtTimeInput.val();
            var objDate = new Date();
            var d1 = TimeBox.createDateTimeObj(objDate, rawTimeInput);
            if (!d1) return false;
            var strStartTime = d1.toShortTimeString();
            $txtTimeInput.val(strStartTime);
        });
    },
    createDateTimeObj: function (objDate, rawInput) {
        // check for illegal characters
        var reFail = /[^\d\.\:aApP+mM\s]/g;
        var arrayFail = rawInput.match(reFail);
        if (arrayFail) { TimeBox.error('Invalid character entered ~ use only the numbers 0-9 and the following special characters [ :  .  a  am  AM  p  pm  PM  + ]'); return false; }

        // check for blank line
        var reValids = /[\d\.\:aApP+mM]/g;
        var validChars = rawInput.match(reValids);
        if (!validChars) { return false; }

        // check for at least 1 number
        var reAnyNumber = /[0-9]/g;
        var atLeastOneNumber = rawInput.match(reAnyNumber)
        if (!atLeastOneNumber) { TimeBox.error('At least 1 number must be entered'); return false; }

        // get numbers, periods and colons
        var reDigits = /[\d\.\:]/g;
        var digits = rawInput.match(reDigits);

        // build array of number sections
        var strLoop = "";
        for (i = 0; i < digits.length; i++) { strLoop += digits[i] }
        var nums = strLoop.replace(/\./g, ":").split(":");

        // build AM or PM for end of new time string
        var reAP = /[\d\:\.mM\s]/g;
        var ampmRaw = rawInput.replace(reAP, "").toLowerCase();
        var ampmClean = "";
        switch (ampmRaw) {
            case 'p':
            case '+':
                ampmClean = "PM";
                break;
            case 'a':
            case '':
                ampmClean = "AM"
                break;
            default:
                TimeBox.error('Invalid Time Suffix ~ use only [a, am, AM, p, pm, PM, +] or leave blank for am');
                return false;
        }

        var h = nums[0]; var m = nums[1]; var s = nums[2];

        if (h) {
            var hoursValid = true;
            h = h.replace(/\s/g, "");
            var hh = parseInt(h);
            if (hh > 12) ampmClean = "";
            if (hh > 23) hoursValid = false;
            if (h.length > 2) hoursValid = false;
            if (h.length == 0) h = '00';
            if (h.length == 1) h = '0' + h;
            if (!hoursValid) { TimeBox.error('Invalid Hours (' + h + ') ~ use only [0 - 23]'); return false; }
        }
        else { m = "00" }

        if (m) {
            m = m.replace(/\s/g, "");
            var mm = parseInt(m);
            if (mm > 59) { TimeBox.error('Invalid Minutes ~ use only [0-59]'); return false; }
            if (m.length == 0) m = '00';
            if (m.length == 1) m = m + '0';
        }
        else { m = "00" }

        if (s) {
            s = s.replace(/\s/g, "");
            var ss = parseInt(s);
            if (ss > 59) { TimeBox.error('Invalid Seconds ~ use only [0-59]'); return false; }
            if (s.length == 0) s = '00';
            if (s.length == 1) s = s + '0';
        }
        else { s = "00" }

        var timestring = h + ':' + m + ':' + s;
        timestring = timestring + ' ' + ampmClean;
        return new Date(objDate.toDateString() + ' ' + timestring);
    }
};