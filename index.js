let reponseData;

//Make the inital call to load Data
(function() {
    $.ajax({
        url: './data.json',
        success: function(data) {
            reponseData = data.map(item => {
                return {
                    "name": (item.capital || 'Not provided')  + "-" + item.name,
                    "flag": item.flag
                }
            }).sort(compare);
            paintList(reponseData);
        }
    })
})();

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
  
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
}


function paintList(data) {
    let html = ``;
    let indexesHtml = ``;
    const indexes = [];
    data.forEach((item) => {
        html += `<li data-index="${item.name[0]}">
                    <input type="checkbox"/>
                    <img class="flag" src="${item.flag}"/>
                    <label class="city-name">${item.name}</label>
                </li>`;
        const index = item.name[0];
        if(!indexes.includes(index)) {
            indexes.push(index);
            indexesHtml += `<div class="index">${index}</div>`
        }
    });
    $('#indexes').html(indexesHtml);
    $('#results').html(html);
}

function searchResults(key) {
    if(key && key !== "" && key.trim() !== "") {
        const data = reponseData.filter((item) => item.name.toLowerCase().includes(key.toLowerCase()));
        paintList(data);
    }
}


//Event bindings
$('#collapse-horizontal').click(function() {
    $('#widget-body').hide();
    $(this).hide();
    $('#expand-horizontal').show();
});

$('#expand-horizontal').click(function() {
    $('#widget-body').show();
    $(this).hide();
    $('#collapse-horizontal').show();
});

$('#collapse-vertical').click(function() {
    $('#widget-body').hide();
    $(this).hide();
    $('#collapse-horizontal').hide();
    $('#expand-horizontal').hide();
    $('#expand-vertical').show();
    $('#location-widget').addClass('vertical-collapsed');
});

$('#expand-vertical').click(function() {
    $('#widget-body').show();
    $(this).hide();
    $('#collapse-horizontal').show();
    $('#collapse-vertical').show();
    $('#location-widget').removeClass('vertical-collapsed');
});

$('#search-input').on('keyup', function(event) {
    //On press on enter trigger search
    if(event.keyCode === 13) {
        searchResults($(this).val());
    }
});

$('#indexes').on('click', '.index', function(event) {
    const index = $(this).text();
    $(`li[data-index="${index}"]`)[0].scrollIntoView({behavior: "smooth"});
});