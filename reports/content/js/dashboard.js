/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 98.94736842105263, "KoPercent": 1.0526315789473684};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6083333333333333, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "https://automationexercise.com/add_to_cart/3"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/products?search=Madame Top For Women"], "isController": false}, {"data": [0.5, 500, 1500, "Buy a Product"], "isController": true}, {"data": [1.0, 500, 1500, "https://automationexercise.com/add_to_cart/39"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/view_cart"], "isController": false}, {"data": [0.75, 500, 1500, "https://automationexercise.com/"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/logout-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/add_to_cart/7"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/logout-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/add_to_cart/35"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/products?search=Green Side Placket Detail T-Shir"], "isController": false}, {"data": [0.5, 500, 1500, "Logout"], "isController": true}, {"data": [0.0, 500, 1500, "Big Billion Days Sale"], "isController": true}, {"data": [0.0, 500, 1500, "Load Web & Login"], "isController": true}, {"data": [1.0, 500, 1500, "https://automationexercise.com/download_invoice/1200"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/download_invoice/7200"], "isController": false}, {"data": [0.5, 500, 1500, "https://automationexercise.com/logout"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/download_invoice/1000"], "isController": false}, {"data": [0.5, 500, 1500, "https://automationexercise.com/login"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/products"], "isController": false}, {"data": [0.5, 500, 1500, "https://automationexercise.com/payment"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/payment-1"], "isController": false}, {"data": [0.5, 500, 1500, "https://automationexercise.com/payment-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/products?search=Regular Fit Straight Jeans"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/add_to_cart/29"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/products?search=Cotton Silk Hand Block Print Saree"], "isController": false}, {"data": [0.5, 500, 1500, "https://automationexercise.com/checkout"], "isController": false}, {"data": [0.0, 500, 1500, "Payment Process"], "isController": true}, {"data": [0.0, 500, 1500, "https://automationexercise.com/login-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://automationexercise.com/products?search=Sleeveless Dress"], "isController": false}, {"data": [0.6, 500, 1500, "https://automationexercise.com/login-1"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 95, 1, 1.0526315789473684, 761.3999999999999, 261, 3276, 328.0, 1605.2, 2439.599999999999, 3276.0, 2.645944741532977, 47.68994445256796, 1.9826906037628118], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://automationexercise.com/add_to_cart/3", 1, 0, 0.0, 261.0, 261, 261, 261.0, 261.0, 261.0, 261.0, 3.8314176245210727, 2.8174389367816093, 2.6303579980842913], "isController": false}, {"data": ["https://automationexercise.com/products?search=Madame Top For Women", 1, 0, 0.0, 299.0, 299, 299, 299.0, 299.0, 299.0, 299.0, 3.3444816053511706, 46.182587792642146, 2.1752194816053514], "isController": false}, {"data": ["Buy a Product", 5, 0, 0.0, 1256.4, 1220, 1288, 1261.0, 1288.0, 1288.0, 1288.0, 2.177700348432056, 163.71372767857144, 5.784091218423345], "isController": true}, {"data": ["https://automationexercise.com/add_to_cart/39", 1, 0, 0.0, 308.0, 308, 308, 308.0, 308.0, 308.0, 308.0, 3.246753246753247, 2.4255529626623376, 2.232142857142857], "isController": false}, {"data": ["https://automationexercise.com/view_cart", 5, 0, 0.0, 331.8, 283, 415, 293.0, 415.0, 415.0, 415.0, 3.5410764872521248, 46.25738646423513, 2.4434810995042495], "isController": false}, {"data": ["https://automationexercise.com/", 10, 0, 0.0, 795.4, 311, 1410, 705.5, 1403.5, 1410.0, 1410.0, 0.2855755775766057, 14.782133722549046, 0.15784743838706913], "isController": false}, {"data": ["https://automationexercise.com/logout-1", 5, 0, 0.0, 272.4, 268, 278, 272.0, 278.0, 278.0, 278.0, 9.140767824497258, 64.69949725776965, 5.668347234917733], "isController": false}, {"data": ["https://automationexercise.com/add_to_cart/7", 1, 0, 0.0, 309.0, 309, 309, 309.0, 309.0, 309.0, 309.0, 3.236245954692557, 2.3734577265372168, 2.221758697411003], "isController": false}, {"data": ["https://automationexercise.com/logout-0", 5, 0, 0.0, 285.2, 276, 304, 283.0, 304.0, 304.0, 304.0, 9.157509157509159, 8.111192193223443, 5.687671703296703], "isController": false}, {"data": ["https://automationexercise.com/add_to_cart/35", 1, 0, 0.0, 330.0, 330, 330, 330.0, 330.0, 330.0, 330.0, 3.0303030303030303, 2.24609375, 2.083333333333333], "isController": false}, {"data": ["https://automationexercise.com/products?search=Green Side Placket Detail T-Shir", 1, 0, 0.0, 279.0, 279, 279, 279.0, 279.0, 279.0, 279.0, 3.5842293906810037, 49.65417786738351, 2.37315188172043], "isController": false}, {"data": ["Logout", 5, 0, 0.0, 926.6, 861, 966, 951.0, 966.0, 966.0, 966.0, 4.401408450704226, 263.3323132152289, 8.170974086707748], "isController": true}, {"data": ["Big Billion Days Sale", 5, 1, 20.0, 9598.0, 8994, 9943, 9644.0, 9943.0, 9943.0, 9943.0, 0.4744283138817725, 130.30942733537339, 4.890410765964513], "isController": true}, {"data": ["Load Web & Login", 5, 1, 20.0, 4217.6, 3558, 4595, 4208.0, 4595.0, 4595.0, 4595.0, 0.9663703131039815, 107.73575660755701, 2.25549321124855], "isController": true}, {"data": ["https://automationexercise.com/download_invoice/1200", 1, 0, 0.0, 279.0, 279, 279, 279.0, 279.0, 279.0, 279.0, 3.5842293906810037, 2.950688844086021, 2.4781586021505375], "isController": false}, {"data": ["https://automationexercise.com/download_invoice/7200", 2, 0, 0.0, 284.0, 273, 295, 284.0, 295.0, 295.0, 295.0, 4.237288135593221, 3.533832097457627, 2.9296875], "isController": false}, {"data": ["https://automationexercise.com/logout", 5, 0, 0.0, 557.8, 550, 575, 551.0, 575.0, 575.0, 575.0, 6.067961165048543, 48.324436817354375, 7.531619766383495], "isController": false}, {"data": ["https://automationexercise.com/download_invoice/1000", 2, 0, 0.0, 281.0, 278, 284, 281.0, 284.0, 284.0, 284.0, 6.688963210702341, 5.558894230769231, 4.624790969899665], "isController": false}, {"data": ["https://automationexercise.com/login", 10, 1, 10.0, 1497.8, 270, 3276, 1276.5, 3243.7000000000003, 3276.0, 3276.0, 0.9858044164037855, 29.487874605678233, 0.9087884463722398], "isController": false}, {"data": ["https://automationexercise.com/products", 5, 0, 0.0, 331.0, 314, 372, 323.0, 372.0, 372.0, 372.0, 3.695491500369549, 175.69608046932743, 2.302464430894309], "isController": false}, {"data": ["https://automationexercise.com/payment", 10, 0, 0.0, 942.0, 275, 1616, 935.0, 1614.2, 1616.0, 1616.0, 4.22654268808115, 32.49938913250211, 4.417645155325443], "isController": false}, {"data": ["https://automationexercise.com/payment-1", 5, 0, 0.0, 288.2, 276, 303, 285.0, 303.0, 303.0, 303.0, 9.45179584120983, 59.7179968100189, 5.64523275047259], "isController": false}, {"data": ["https://automationexercise.com/payment-0", 5, 0, 0.0, 1305.8, 1287, 1331, 1302.0, 1331.0, 1331.0, 1331.0, 3.1665611146295127, 2.397804187777074, 2.6099390436985432], "isController": false}, {"data": ["https://automationexercise.com/products?search=Regular Fit Straight Jeans", 1, 0, 0.0, 325.0, 325, 325, 325.0, 325.0, 325.0, 325.0, 3.076923076923077, 42.56610576923077, 2.019230769230769], "isController": false}, {"data": ["https://automationexercise.com/add_to_cart/29", 1, 0, 0.0, 271.0, 271, 271, 271.0, 271.0, 271.0, 271.0, 3.6900369003690034, 2.735095710332103, 2.53690036900369], "isController": false}, {"data": ["https://automationexercise.com/products?search=Cotton Silk Hand Block Print Saree", 1, 0, 0.0, 288.0, 288, 288, 288.0, 288.0, 288.0, 288.0, 3.472222222222222, 48.122829861111114, 2.3057725694444446], "isController": false}, {"data": ["https://automationexercise.com/checkout", 5, 0, 0.0, 1031.6, 1022, 1039, 1031.0, 1039.0, 1039.0, 1039.0, 2.4521824423737124, 29.341416595144675, 1.6667177538008826], "isController": false}, {"data": ["Payment Process", 5, 0, 0.0, 3197.4, 3171, 3218, 3197.0, 3218.0, 3218.0, 3218.0, 1.1956001912960306, 33.6858018741033, 4.138598084050693], "isController": true}, {"data": ["https://automationexercise.com/login-0", 5, 0, 0.0, 1919.8, 1515, 2421, 1950.0, 2421.0, 2421.0, 2421.0, 2.035830618892508, 1.794075732899023, 1.3976454346498373], "isController": false}, {"data": ["https://automationexercise.com/products?search=Sleeveless Dress", 1, 0, 0.0, 298.0, 298, 298, 298.0, 298.0, 298.0, 298.0, 3.3557046979865772, 46.31134647651007, 2.1694106543624163], "isController": false}, {"data": ["https://automationexercise.com/login-1", 5, 0, 0.0, 797.2, 317, 1126, 997.0, 1126.0, 1126.0, 1126.0, 2.4679170779861797, 127.99909766781838, 1.4315847112537021], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["The operation lasted too long: It took 3,276 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, 100.0, 1.0526315789473684], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 95, 1, "The operation lasted too long: It took 3,276 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://automationexercise.com/login", 10, 1, "The operation lasted too long: It took 3,276 milliseconds, but should not have lasted longer than 3,000 milliseconds.", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
