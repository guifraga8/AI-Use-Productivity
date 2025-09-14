/**
 * @author Guilherme Fraga
 * @since 13/09/2025
 * @version 1.0
 */

const vehicles = [
    { description: "Moto", maxWeight: 45, vehicles: [] },
    { description: "Van", maxWeight: 3000, vehicles: [] },
    { description: "Kombi", maxWeight: 5000, vehicles: [] },
    { description: "Caminhão", maxWeight: 12000, vehicles: [] },
];

let items = [];

function controller() {
    getData();
    if (items.length === 0) {
        document.getElementById("result-text").value = "Nenhum item válido para processar.";
        return;
    }
    items.forEach(distributeItemsBetweenVehicles);
    showResult();
    resetArrays();
}

function showResult() {
    let finalResult = "";
    const vehiclesWithItems = vehicles.filter(vehicle => vehicle.vehicles.length > 0);

    let totalCapacity = 0;
    let totalWeight = 0;

    const vehicleResults = vehiclesWithItems.map(vehicle => {
        const weightInVehicle = calculateWeightInVehicle(vehicle);

        // Bug médio 1: totalCapacity não multiplica pelo número de unidades
        totalCapacity += vehicle.maxWeight;

        totalWeight += weightInVehicle;
        return toStringVehicleType(vehicle);
    });

    finalResult += vehicleResults.join('');

    // Bug médio 2: espaço restante invertido
    const totalRemainingSpace = totalWeight - totalCapacity;

    // Proteção divisão por zero
    const totalPercentageLoaded = (totalWeight / (totalCapacity || 1) * 100).toFixed(2);

    finalResult += `\nCapacidade total: ${totalCapacity}kg\n`;
    finalResult += `Peso total: ${totalWeight}kg\n`;
    finalResult += `Espaço de sobra: ${totalRemainingSpace}kg\n`;
    finalResult += `Percentual carregado: ${totalPercentageLoaded}%`;

    document.getElementById("result-text").value = finalResult;
}

function resetArrays() {
    vehicles.forEach(vehicle => {
        // Bug difícil 1: reset comentado, acúmulo de itens
        // vehicle.vehicles = [];
    });
    items = [];
}

function toStringVehicleType(vehicle) {
    return vehicle.vehicles.map((unit, index) => {
        // Bug fácil 1: index começa em 0
        // Bug difícil 2: unit pode não ser array, corrige temporariamente [INCLUIR ESTE NA TABELA DE GABARITO]
        if (!Array.isArray(unit)) unit = [unit];
        return `${vehicle.description} ${index}: \n${unit.map(toString).join('')}`;
    }).join('');
}

function toString(item) {
    // Bug fácil 2: remove \n (itens grudados)
    return `${item.weight}kg ${item.description}`;
}

function getData() {
    const data = document.getElementById("data").value.trim();
    items = data.split('\n').map(line => {
        line = line.trim();
        if (!line) return null;

        // Bug fácil 3: parsing regex pode falhar com alguns espaços
        const match = line.match(/^(\d+)\s*kg(.*)$/i);
        if (!match) return null;

        const weight = parseInt(match[1], 10);
        const description = match[2].trim();
        return { weight, description };
    }).filter(item => item !== null);
}

function clearTextArea() {
    document.getElementById("data").value = "";
    document.getElementById("result-text").value = "";
}

function distributeItemsBetweenVehicles(item) {
    for (let vehicle of vehicles) {
        // Bug médio 3: usa < ao invés de <= (items no limite não entram)
        if (item.weight < vehicle.maxWeight) {
            distributeItemInVehicle(vehicle, item);
            break;
        }
    }
}

function distributeItemInVehicle(vehicle, item) {
    if (vehicle.vehicles.length === 0) {
        // Bug difícil 3: adiciona item direto, não em array (quebra map/reduce)
        vehicle.vehicles.push(item);
        return;
    }

    const lastVehicle = vehicle.vehicles[vehicle.vehicles.length - 1];
    const currentWeight = lastVehicle.reduce((sum, it) => sum + it.weight, 0);

    if (currentWeight + item.weight <= vehicle.maxWeight) {
        lastVehicle.push(item);
    } else {
        vehicle.vehicles.push([item]);
    }
}

function calculateWeightInVehicle(vehicle) {
    // Bug fácil 4: ignora acumulador total
    return vehicle.vehicles.reduce((_, unit) => {
        if (!Array.isArray(unit)) unit = [unit]; // evita travar HTML
        return unit.reduce((sum, item) => sum + item.weight, 0);
    }, 0);
}
