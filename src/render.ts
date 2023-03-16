import { Size } from "spotfire-api";
import P5 from "p5";
import { sketch } from "./paint";

export let colorToPlot: string = "#000";
new P5(sketch);

export async function render(
    dataView: Spotfire.DataView,
    windowSize: Size,
    toolTipDisplayAxes: Spotfire.Axis[],
    mod: Spotfire.Mod
) {
    let context = mod.getRenderContext();
    document.querySelector("#extra_styling")!.innerHTML = `
    .displayText { fill: ${context.styling.general.font.color}; font-size: ${context.styling.general.font.fontSize}px; font-weight: ${context.styling.general.font.fontWeight}; font-style: ${context.styling.general.font.fontStyle};}
    .message { fill: ${context.styling.general.font.color}; font-size: ${context.styling.general.font.fontSize}px; font-weight: ${context.styling.general.font.fontWeight}; font-style: ${context.styling.general.font.fontStyle};}
    `;

    // Set default color:
    colorToPlot = "#000";
    //Read the data and meta data
    const axes = await dataView.axes();
    //console.log(axes.map(axis => axis.name).join(","));
    const rows = await dataView.allRows();
    if (rows)
        rows.forEach(row => {
            console.log(axes.map(axis => {
                if (axis.isCategorical) {
                    if (row.isMarked()) {
                        let newColorSelected: string = row.categorical(axis.name).formattedValue();
                        colorToPlot = newColorSelected;
                    }
                    return row.categorical(axis.name).formattedValue()
                }
                return row.continuous(axis.name).value()
            }).join(","));
        });
}
