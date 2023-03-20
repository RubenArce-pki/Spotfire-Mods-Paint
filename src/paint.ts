import ButtonItem from "./renderItems/itemCard";
import Spot from "./renderItems/Spot";
import P5 from "p5";
import { colorToPlot } from "./render";


let itemCards: ButtonItem[] = [];
let spots: Spot[] = [];

export const ResizeApp = (p5: P5) => {
    const x = document.body.clientWidth;
    const y = document.body.clientHeight;
    p5.resizeCanvas(x, y);
    p5.background(255);
    // Add button to clear:
    const btnPos = p5.createVector(x, y);
    itemCards = []
    itemCards.push(new ButtonItem(p5, btnPos, "clear"));
}

export const sketch = (p5: P5): P5 => {
    const maxX = document.body.clientWidth;
    const maxY = document.body.clientHeight;

    let isClickPress: boolean = false;
    let isRightClick: boolean = false;

    p5.setup = () => {
        // Creating and positioning the canvas
        const canvas = p5.createCanvas(maxX, maxY);
        canvas.parent("app");
        p5.background(0xff);

        // Add button to clear:
        const btnPos = p5.createVector(maxX, maxY);
        itemCards.push(new ButtonItem(p5, btnPos, "clear"));
    };

    p5.draw = () => {
        // Draw button
        itemCards.forEach(item => item.draw());

        // Draw previous paint
        spots.forEach(item => item.draw());

        // Add more spots to picture:
        if (isClickPress) {
            const sPos = p5.createVector(p5.mouseX, p5.mouseY);
            const color = isRightClick ? "#fff" : colorToPlot;
            spots.push(new Spot(p5, sPos, color))
        }
    };
    p5.mouseClicked = (event: any) => {
        // Check if clear is needed
        itemCards.forEach(item => {
            if (item.checkColision(event.pageX, event.pageY)) {
                spots = [];
                p5.background(0xff);
            }
        });
    }
    p5.mousePressed = (event: any) => {
        isClickPress = true;
        isRightClick = event.button == 2 ? true : false;
    }

    p5.mouseReleased = (event: any) => {
        isClickPress = false;
    }
    return p5;
};
