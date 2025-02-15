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

// Retort Calculation
function calculateRetort() {
    const sampleWeight = parseFloat(document.getElementById('sampleWeight').value);
    const oilContent = parseFloat(document.getElementById('oilContent').value);
    const result = document.getElementById('result');

    if (isNaN(sampleWeight) || isNaN(oilContent)) {
        result.innerHTML = "Please enter valid values for sample weight and oil content.";
        return;
    }

    // Formula: Sample Weight x Oil Content / 100
    const oilWeight = (sampleWeight * oilContent) / 100;
    result.innerHTML = `Oil Weight: ${oilWeight.toFixed(2)} grams`;
}
