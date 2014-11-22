var ntw;

(function() {
    var dict = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn",
        "elf", "zwölf", "sechzehn", "siebzehn",
        "zwanzig", "dreissig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig",
        "und", "ein",
        "hundert", "tausend", "ionen", "iarden", "eine"
    ];

    var millionUpwardsDict = ["mill", "bill", "trill", "quadrill", "quint",
        "sextill", "septill", "oktill", "nonill", "dezill"
    ];

    function numberToWord(number) {
        if (typeof number === "undefined")
            return;

        var word = "";

        //10^n, n ermitteln
        var powerToTen = getPowerToTen(number);
        var flattenPower = getFlattenPower(powerToTen);

        while (flattenPower > 2) {

            var base = getBase(flattenPower, number);
            number = cutTop(flattenPower, number);

            if (base > 0) {
                word += getZeroToNineHundredNinetyNine(base, flattenPower);
                if (flattenPower > 5)
                    word += getMillionUpwardsWord(flattenPower);
                else
                    word += dict[26]; //tausend
            }

            flattenPower -= 3;
        }
        if (number > 0 || powerToTen < 3)
            word += getZeroToNineHundredNinetyNine(number, flattenPower);
        return word;
    };

    function getMillionUpwardsWord(flattenPower) {
        var prefixIndex = (flattenPower - flattenPower % 6) / 6 - 1;
        var prefix = millionUpwardsDict[prefixIndex]; //mill bill etc.
        var suffix = flattenPower % 2 === 0 ? dict[27] : dict[28]; //ionen oder iarden
        return prefix + suffix;
    }

    function getZeroToNineHundredNinetyNine(number, power) {
        var units = getFlatPosition(1, number);
        var tens = getFlatPosition(10, number);
        var hundreds = getFlatPosition(100, number);
        var word = "";
        if (hundreds > 0)
            word += getHundreds(hundreds);
        if (tens === 0) {
            if (hundreds === 0 || hundreds > 0 && units > 0) {
                word += getZeroToNine(units, power);
            }
        } else if (tens === 1)
            word += getTenTillNineteen(units);
        else
            word += getTwentyTillNinetyNine(tens, units);

        return word;
    }

    //gibt zurück, wie viel Tausend, Millionen etc. vorhanden sind
    //Bsp.: 123456 hat 123 Tausender
    //power: 10^power
    //number: zu untersuchende Zahl
    function getBase(flattenPower, number) {
        var sum = Math.pow(10, flattenPower);
        return (number - number % sum) / sum;
    }

    function cutTop(flattenPower, number) {
        return number % Math.pow(10, flattenPower);
    }

    function getFlattenPower(power) {
        return power - power % 3;
    }

    function getPowerToTen(number) {
        return number.toString().length - 1;
    }

    //gibt Einser-, Zehnerstelle usw. zurück
    //position: Gewünschte Stelle, bspw. 1, 10 oder 100
    //number: zu untersuchende Zahl
    function getFlatPosition(position, number) {
        var flattenNumber = number % (position * 10) - number % position;
        while (flattenNumber > 9)
            flattenNumber /= 10;
        return flattenNumber;
    }

    function getZeroToNine(units, power) {
        if (typeof power === "undefined")
            power = 0;

        if (power > 5 && units === 1)
            return dict[29]; //eine
        else if (power > 2)
            return dict[24]; //ein
        else
            return dict[units]; //0 - 9
    };

    function getTenTillNineteen(units) {
        if (units === 0)
            return dict[10]; //10
        else if (units === 1 || units === 2)
            return dict[10 + units]; //11 12
        else if (units === 6 || units === 7)
            return dict[7 + units]; //16 17
        else
            return dict[units] + dict[10]; //13 14 15 18 19
    };

    function getTwentyTillNinetyNine(tens, units) {
        var word = "";

        //bei 0 wird nichts gemacht

        if (units === 1)
            word += dict[24] + dict[23]; //1 "und"
        else if (units > 1)
            word += dict[units] + dict[23] //2-9 "und"

        return word + dict[tens + 13]; //+ 20 30 40 50 60 70 80 90 an
    };

    function getHundreds(hundreds) {
        if (hundreds === 0)
            return "";
        else if (hundreds === 1)
            return dict[24] + dict[25];
        else
            return dict[hundreds] + dict[25];
    }

    ntw = numberToWord;
}());