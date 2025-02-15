// Hydrostatic Pressure Calculation
function calculateHydrostaticPressure() {
    const mudWeight = parseFloat(document.getElementById('mudWeight').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const result = document.getElementById('result');

    if (isNaN(mudWeight) || isNaN(distance)) {
        result.innerHTML = "Please enter valid values for mud weight and distance.";
        return;
    }

    // Formula: Mud Weight x Distance x 0.052
    const pressure = mudWeight * distance * 0.052;
    result.innerHTML = `Hydrostatic Pressure: ${pressure.toFixed(2)} psi`;
}

// Shale Shaker G-Force Calculation
function calculateShaleShakerGForce() {
    const stroke = parseFloat(document.getElementById('stroke').value);
    const rpm = parseFloat(document.getElementById('rpm').value);
    const hz = document.getElementById('hz').value;
    const result = document.getElementById('result');

    if (isNaN(stroke) || isNaN(rpm)) {
        result.innerHTML = "Please enter valid values for stroke and RPM.";
        return;
    }

    // Formula: (Stroke x RPM^2) / 70414
    let gForce = (stroke * Math.pow(rpm, 2)) / 70414;
    
    if (hz === "50") {
        gForce = gForce * 0.8; // Decrease G-Force by 20% if 50 Hz
    }

    result.innerHTML = `Shale Shaker G-Force: ${gForce.toFixed(2)} G`;
}

// Hydrocyclone G-Force Calculation (Same as Hydrostatic Pressure)
function calculateHydrocycloneGForce() {
    const mudWeight = parseFloat(document.getElementById('mudWeight').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const result = document.getElementById('result');

    if (isNaN(mudWeight) || isNaN(distance)) {
        result.innerHTML = "Please enter valid values for mud weight and distance.";
        return;
    }

    // Formula: Mud Weight x Distance x 0.052
    const gForce = mudWeight * distance * 0.052;
    result.innerHTML = `Hydrocyclone G-Force: ${gForce.toFixed(2)} psi`;
}

// Centrifuge G-Force Calculation
function calculateCentrifugeGForce() {
    const bowlDiameter = parseFloat(document.getElementById('bowlDiameter').value);
    const rpm = parseFloat(document.getElementById('rpm').value);
    const result = document.getElementById('result');

    if (isNaN(bowlDiameter) || isNaN(rpm)) {
        result.innerHTML = "Please enter valid values for bowl diameter and RPM.";
        return;
    }

    // Formula: (Bowl Diameter x RPM^2) / 70414
    const gForce = (bowlDiameter * Math.pow(rpm, 2)) / 70414;
    result.innerHTML = `Centrifuge G-Force: ${gForce.toFixed(2)} G`;
}

// Retort Calculation Function
function calculateRetort() {
    const ccChoice = document.getElementById('ccChoice').value; // Get chosen cylinder size (50cc or 10cc)
    const oilVolume = parseFloat(document.getElementById('oilVolume').value); // Oil volume in mL
    const waterVolume = parseFloat(document.getElementById('waterVolume').value); // Water volume in mL
    const emptyCellWeight = parseFloat(document.getElementById('emptyCellWeight').value); // Empty cell weight
    const cellWeightWithSamples = parseFloat(document.getElementById('cellWeightWithSamples').value); // Weight with samples
    const cylinderWeightEmpty = parseFloat(document.getElementById('cylinderWeightEmpty').value); // Cylinder weight empty
    const cylinderWeightWithCondensate = parseFloat(document.getElementById('cylinderWeightWithCondensate').value); // Cylinder weight with condensate

    const result = document.getElementById('result');

    // Validate inputs
    if (isNaN(oilVolume) || isNaN(waterVolume) || isNaN(emptyCellWeight) || isNaN(cellWeightWithSamples) || isNaN(cylinderWeightEmpty) || isNaN(cylinderWeightWithCondensate)) {
        result.innerHTML = "Please enter valid values for all fields.";
        return;
    }

    // Volume Multiplication Based on Cylinder Size
    let oilResult = oilVolume * (ccChoice === "50" ? 2 : 10);
    let waterResult = waterVolume * (ccChoice === "50" ? 2 : 10);
    
    // Calculate Solids (Oil - Water)
    let solidsResult = oilResult - waterResult;

    // Weight Calculations
    const weightOfCondensate = cylinderWeightWithCondensate - cylinderWeightEmpty;
    const weightOfOil = oilResult * (weightOfCondensate / (oilVolume + waterVolume));
    const weightOfWater = waterResult * (weightOfCondensate / (oilVolume + waterVolume));
    const weightOfSample = cellWeightWithSamples - emptyCellWeight;

    // Percentage Calculations
    const percentOilByWeight = (weightOfOil / weightOfSample) * 100;
    const percentWaterByWeight = (weightOfWater / weightOfSample) * 100;
    const percentSolidsByWeight = 100 - percentOilByWeight - percentWaterByWeight;

    // Display Results
    result.innerHTML = `
        <p><strong>Oil Weight:</strong> ${weightOfOil.toFixed(2)} g</p>
        <p><strong>Water Weight:</strong> ${weightOfWater.toFixed(2)} g</p>
        <p><strong>Solids Weight:</strong> ${solidsResult.toFixed(2)} g</p>
        <p><strong>% Oil by Weight:</strong> ${percentOilByWeight.toFixed(2)}%</p>
        <p><strong>% Water by Weight:</strong> ${percentWaterByWeight.toFixed(2)}%</p>
        <p><strong>% Solids by Weight:</strong> ${percentSolidsByWeight.toFixed(2)}%</p>
    `;
    
}
let oilResult = 0;
let waterResult = 0;
let solidsResult = 0;
let weightOfOil = 0;
let weightOfWater = 0;
let weightOfSolids = 0;
let weightOfSample = 0;

function calculateVolume() {
    const sampleType = document.getElementById('sampleType').value;
    const oilVolume = parseFloat(document.getElementById('oilVolume').value);
    const waterVolume = parseFloat(document.getElementById('waterVolume').value);
    const result = document.getElementById('result');

    if (isNaN(oilVolume) || isNaN(waterVolume)) {
        result.innerHTML = "Please enter valid values for oil and water volume.";
        return;
    }

    let oilVolumeFactor = sampleType === "50cc" ? 2 : 10;
    let oilVolumeCalculated = oilVolume * oilVolumeFactor;
    let waterVolumeCalculated = waterVolume * oilVolumeFactor;

    let oilByVolume = (oilVolumeCalculated / 100) * 100; // already in % based on 100ml
    let waterByVolume = (waterVolumeCalculated / 100) * 100; // already in % based on 100ml
    let solidsByVolume = 100 - (oilByVolume + waterByVolume);

    result.innerHTML = `
        <p>Oil by Volume: ${oilByVolume.toFixed(2)}%</p>
        <p>Water by Volume: ${waterByVolume.toFixed(2)}%</p>
        <p>Solids by Volume: ${solidsByVolume.toFixed(2)}%</p>
    `;
}

function calculateWeight() {
    const oilVolume = parseFloat(document.getElementById('oilVolume').value);
    const waterVolume = parseFloat(document.getElementById('waterVolume').value);
    const cellWeightWithSample = parseFloat(document.getElementById('cellWeightWithSample').value);
    const emptyCellWeight = parseFloat(document.getElementById('emptyCellWeight').value);
    const cylinderWeightEmpty = parseFloat(document.getElementById('cylinderWeightEmpty').value);
    const cylinderWeightWithCondensate = parseFloat(document.getElementById('cylinderWeightWithCondensate').value);
    const result = document.getElementById('result');

    if (
        isNaN(oilVolume) || isNaN(waterVolume) ||
        isNaN(cellWeightWithSample) || isNaN(emptyCellWeight) ||
        isNaN(cylinderWeightEmpty) || isNaN(cylinderWeightWithCondensate)
    ) {
        result.innerHTML = "Please enter valid values for all fields.";
        return;
    }

    // Calculate the net weight of the sample
    const netWeightOfSample = cellWeightWithSample - emptyCellWeight;

    // Calculate the weight of condensate
    const weightOfCondensate = cylinderWeightWithCondensate - cylinderWeightEmpty;

    // Calculate Oil by Weight Percentage
    const oilByWeight = (weightOfCondensate / netWeightOfSample) * 100;

    // Calculate Water by Weight Percentage
    const waterByWeight = (waterVolume / netWeightOfSample) * 100;

    // Calculate Solids by Weight Percentage
    const solidsByWeight = 100 - (oilByWeight + waterByWeight);

    result.innerHTML = `
        <p>Oil by Weight Percentage: ${oilByWeight.toFixed(2)}%</p>
        <p>Water by Weight Percentage: ${waterByWeight.toFixed(2)}%</p>
        <p>Solids by Weight Percentage: ${solidsByWeight.toFixed(2)}%</p>
    `;
}

