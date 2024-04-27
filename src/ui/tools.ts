import schema from "../schema.json";

export function normalizeName(name) {
    let normalized = "";
    let up = false;
    for (const c of name) {
        if (c === '_') up = true;
        else if (up) {
            up = false;
            normalized += c.toUpperCase();
        } else normalized += c;
    }
    return normalized;
}

export function getFormFields(name, config = {}, instance={}) {
    const model = schema.components.schemas[name];
    const required = [];
    const fields = {};
    for (const rawName in model.properties) {
        let name = normalizeName(rawName);
        const f = model.properties[rawName];
        if (f.readOnly) continue;
        if (model.required && model.required.includes(rawName)) required.push(name);
        if (config[name]) {
            fields[name] = {};
            if (config[name].default) fields[name].default = config[name].default;
            if (instance[name]) fields[name].default = instance[name];
            fields[name].title = config[name].title;
        }
        fields[name] = {...fields[name], ...f, name};
    }
    return {properties: fields, required};
}