import P5 from "p5";

export default class Spot {
	private _p5: P5;
	private _pos: P5.Vector;
	private _color: string;
	private _size: number;

	constructor(p5: P5, atPosition: P5.Vector, color: string, size: number) {
		this._p5 = p5;
		this._pos = atPosition;
		this._color = color;
		this._size = size;
	}

	public draw() {
    	this._p5.fill(this._color);
    	this._p5.strokeWeight(0);
    	this._p5.stroke(255);
    	this._p5.ellipse(this._pos.x, this._pos.y, this._size, this._size);
	}
}
