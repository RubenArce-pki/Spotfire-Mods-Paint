import ItemCard from "./renderItems/itemCard";
import P5 from "p5";

const itemCards: ItemCard[] = [];

let value = 0;
let isClickPress: boolean = false
let isRightClick: boolean = false
// Creating the sketch itself
export const sketch = (p5: P5) => {
    console.log("create")
    p5.setup = () => {
        // Creating and positioning the canvas
        const canvas = p5.createCanvas(document.body.clientWidth, document.body.clientHeight);
        canvas.parent("app");
        p5.background(0xff);

        // TODO: paint
        for (let i = 1; i < 4; i++) {
            const p = p5.width / 4;
            const circlePos = p5.createVector(p * i, p5.height / 2);
            const size = i % 2 !== 0 ? 24 : 32;
            itemCards.push(new ItemCard(p5, circlePos, size));
        }
    };

    // The sketch draw method
    p5.draw = () => {
        //itemCards.forEach(item => item.draw());
        if (isClickPress) {
            if (isRightClick)
                p5.fill(222, 0, 0)
            else
                p5.fill(0, 0, 222)
            p5.strokeWeight(0);
            p5.stroke(255);
            p5.ellipse(p5.mouseX, p5.mouseY, 15, 15);
        }
    };
    p5.mouseClicked = (event: any) => {
        console.log(event);
        if (value === 0) {
            value = 255;
        } else {
            value = 0;
        }
    }
    p5.mousePressed = (event: any) => {
        console.log(event.button)
        isClickPress = true;
        if (event.button == 2)
            isRightClick = true;
        else
            isRightClick = false;
    }

    p5.mouseReleased = (event: any) => {
        isClickPress = false;
    }
};
