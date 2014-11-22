var ntw;

(function() {
    var dict = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn",
        "elf", "zwölf", "sechzehn", "siebzehn",
        "zwanzig", "dreissig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig",
        "und", "ein", "hundert"
    ];

    function numberToWord(number) {
        var units = getFlatPosition(1, number);
        var tens = getFlatPosition(10, number);
        var hundreds = getFlatPosition(100, number);
        var word = "";

        if (hundreds > 0)
            word += getHundreds(hundreds);

        if (tens === 0)
            word += getZeroToNine(units);
        else if (tens === 1)
            word += getTenTillNineteen(units);
        else
            word += getTwentyTillNinetyNine(tens, units);

        return word;
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

    function getZeroToNine(units) {
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