import { render } from "./render";

window.Spotfire.initialize(async (mod) => {
    const context = mod.getRenderContext();
    // Create reader function which is actually a one time listener for the provided values.
    const reader = mod.createReader(
        mod.visualization.data(),
        mod.windowSize()
    );

    reader.subscribe(async (dataView, windowSize, ...axes) => {
        try {
            const errors = await dataView.getErrors();
            if (errors.length > 0) {
                mod.controls.errorOverlay.show(errors, "DataView");
            } else {
                mod.controls.errorOverlay.hide("DataView");

                const allRows = await dataView.allRows();
                if (allRows === null) {
                    return;
                }

                await render(dataView, windowSize, axes, mod);

                context.signalRenderComplete();

                mod.controls.errorOverlay.hide("General");
            }
        } catch (e: any) {
            console.error(e);
            mod.controls.errorOverlay.show(
                e.message || "☹️ Something went wrong, check developer console",
                "General"
            );
        }
    });
});
