import P5 from "p5";

export default class ButtonItem {
	private _p5: P5;
	private _pos: P5.Vector;
	private _content: string;

	private _rectPos: P5.Vector;

	constructor(p5: P5, atPosition: P5.Vector, content: string) {
		this._p5 = p5;
		this._pos = atPosition;
		this._content = content;
		this._rectPos = p5.createVector(this._pos.x - 90, this._pos.y - 28);
	}

	public draw() {
		this._p5.textSize(20);
        this._p5.strokeWeight(0.1);
        this._p5.stroke(0);

		this._p5.fill(240);
		this._p5.rect(this._rectPos.x, this._rectPos.y, 80, 25)

		this._p5.fill(0);
		this._p5.text(this._content, this._pos.x - 70, this._pos.y - 8);

	}
	public checkColision(x: number, y: number): boolean {
		// TODO: Crude colision detection, must be done ok
		if (x > this._rectPos.x && y > this._rectPos.y)
		 	return true;
		return false;
	}
}
