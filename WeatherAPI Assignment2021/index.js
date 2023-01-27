
const DATA_SOURCE = 'http://webapi19sa-1.course.tamk.cloud/v1/weather';

const table1 = (data) => {
    let html = '<table id="container">';
    data.forEach((d, i) => {
        const date = new Date(d.date_time)
        html += `
            <tr>
            <td class="inner">${i + 1}</td>
            <td class="inner">${date.toLocaleDateString()}</td>
            <td class="inner">${date.toLocaleTimeString()}</td>
            <td class="inner">${Object.keys(d.data)[0]}</td>
            <td class="inner">${Object.values(d.data)[0]}</td>
            </tr>
      `
    })

    html += '</table>';

    return html;
}

const table = (data, type) => {
    let html = '<table id="container">';
    data.forEach((d, i) => {
        const date = new Date(d.date_time)
        html += `
            <tr>
            <td class="inner">${i + 1}</td>
            <td class="inner">${date.toLocaleDateString()}</td>
            <td class="inner">${date.toLocaleTimeString()}</td>
            <td class="inner">${d[type]}</td>
            <td class="inner">${d[type]}</td>
            </tr>
      `
    })

    html += '</table>';

    return html;
}

const renderChart = (input, values, id, label) => {
    const times = input.map(d => {
        const date = new Date(d.date_time);
        return date.toLocaleTimeString();
    });
    new Chart(
        document.getElementById(id),
        {
            type: 'bar',
            data: {
                labels: times,
                datasets: [{
                    label: label,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: values,
                }]
            },
            options: {}
        }
    );
}

const fetchDataBy = async (type, interval) => {
    const res = await fetch(`${DATA_SOURCE}/${type}/${interval || ""}`).then(res =>
        res.json()
    )
    const data = res.sort((d1, d2) => d1.date_time > d2.date_time ? 1 : -1)

    switch (interval) {
        case 0: return data.slice(0, 20);
        case 24: return data.filter(d => dateFns.isToday(d.date_time));
        case 48:
            let twoDaysFromNow = dateFns.addDays(new Date(), 2);
            return data.filter(d => dateFns.isBefore(d.date_time, twoDaysFromNow));
        case 72:
            let threeDaysFromNow = dateFns.addDays(new Date(), 3);
            return data.filter(d => dateFns.isBefore(d.date_time, threeDaysFromNow));
        case 168:
            let aWeekFromNow = dateFns.addWeeks(new Date(), 1);
            return data.filter(d => dateFns.isBefore(d.date_time, aWeekFromNow));
        case 672:
            let aMonthFromNow = dateFns.addMonths(new Date(), 1);
            return data.filter(d => dateFns.isBefore(d.date_time, aMonthFromNow));
    }
}

document.addEventListener("click", () => {
    const dropdowns = document.getElementsByClassName("dropdown")
    for (const item of dropdowns) {
        item.classList.add("hidden");
    }
})

document.getElementById("btn1").addEventListener("click", async () => {
    const data = await fetch(DATA_SOURCE).then(res => res.json());
    const view1Data = table1(data, 50);
    $('#view').html(view1Data);
})


const btn2 = document.getElementById("btn2");
btn2.addEventListener("mouseenter", () => {
    document.getElementById("dropdown2").classList.remove("hidden");
})


const btn3 = document.getElementById("btn3");
btn3.addEventListener("mouseenter", () => {
    document.getElementById("dropdown3").classList.remove("hidden");
})


const setup = (type, label) => {
    const dropdownItems =
        document.getElementsByClassName("dropdownItem");

    for (const item of dropdownItems) {
        if (item.getAttribute('data-type') === type) {
            item.addEventListener("click", async () => {
                $('#view').html("<h2>Loading data...</h2>")
                $('#canvas').remove();

                const sortedData = await fetchDataBy(type,
                    Number.parseInt(item.getAttribute('data-value')))
                const temperatureValues = sortedData.map(d => d[type])


                $('#view').html(table(sortedData, type));
                $('#canvasContainer').append(`<canvas id="canvas"></canvas>`);
                renderChart(sortedData, temperatureValues, 'canvas', label);
                for (const item of dropdownItems) {
                    item.classList.remove('dropdownItem-active');
                }
                item.classList.add('dropdownItem-active');

            })
        }
    }

}


setup("temperature", "Temperature")
setup("light", "Light")
