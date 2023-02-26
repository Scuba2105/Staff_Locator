const locationOptions = {level3: ['ICU','JHH OPERATING THEATRE','JHH RECOVERY','DELIVERY SUITE','NICU','HAPS LVL 3','RNC OPERATING THEATRE','RNC RECOVERY',
'CATHLAB','ENDOSCOPY','LAB 5','WARD E3','WARD F3','WARD G3','WARD H3','WARD J3','WARD K3','CCU'],
level2: ['SOUTH BLOCK','NORTH BLOCK','DIAGNOSTIC CENTRE','IMAGING','EMERGENCY','PATHOLOGY','GP ACCESS','SLEEP LAB','ALLIED HEALTH',
'OUTPATIENTS','KALIEDOSCOPE A','KALIEDOSCOPE B','KALIEDOSCOPE C','HAPS LVL 2A','HAPS LVL 2B','WARD E2','WARD F2','WARD G2','WARD H2',
'WARD J2','WARD K2','NEXUS','NUCLEAR MEDICINE','NEUROLOGY','GASTROENTEROLOGY','AUDIOLOGY','INNOVATIONS LAB'],
level1: ['H.E.L.L','DOCK','PHYSIOTHERAPY','WARD E1','SIM CENTRE','WARD F1','WARD G1','WARD H1','WARD J1','WARD K1'],
hunter: ['JHH','NEW MAITLAND','BELMONT','NEWCASTLE','BULAHDELAH','KURRI KURRI','CESSNOCK','TAREE','DUNGOG','SINGLETON','DENMAN',
'GLOUCESTOR','SCONE','MUSWELBROOK','MURRURUNDI','MERRIWA'],
"new-england": ['TAMWORTH BME','TAMWORTH','WALCHA','QUIRINDI','GUNNEDAH','MANILLA','ARMIDALE','BOGGABRI','BARRABA','GUYRA','NARRABRI',
'WEEWAA','BINGARA','BUNDARRA','GLEN INNES','EMMAVILLE','MOREE','WARIALDA','INVERELL','TENTERFIELD']};

// Sort the location list alphabetically and append to the dom. 
for (const prop in locationOptions) {
    const locationArray = locationOptions[prop];
    const sortedArray = locationArray.sort();
    const listElements = sortedArray.map((location) => {
        return `<li onclick="findvalue(this)"><a href="#">${location}</a></li>`
    }).join('');
    const area = document.querySelector(`.${prop}`);
    area.innerHTML = listElements;
}
