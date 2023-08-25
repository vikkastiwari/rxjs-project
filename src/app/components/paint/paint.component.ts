import { Component, OnInit } from '@angular/core';
import { fromEvent, map, pairwise, startWith, switchMap, takeUntil, withLatestFrom } from 'rxjs';

@Component({
  selector: 'rxjs-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss']
})
export class PaintComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const canvas = document.getElementById('canvas') as any;
const strokeStyle = document.getElementById('strokeStyle') as any;
const lineWidth = document.getElementById('lineWidth') as any;

const mouseDown$ = fromEvent(canvas, 'mousedown');
const mouseMove$ = fromEvent(canvas, 'mousemove');
const mouseUp$ = fromEvent(canvas, 'mouseup');
const mouseOut$ = fromEvent(canvas, 'mouseout');



const strokeStyle$ = this.getInputStream(strokeStyle);
const lineWidth$ = this.getInputStream(lineWidth);

mouseDown$
  .pipe(
    withLatestFrom(strokeStyle$, lineWidth$, (_, strokeStyle, lineWidth) => ({
      strokeStyle,
      lineWidth
    })),
    switchMap(options =>
      mouseMove$.pipe(
        map((e:any) => ({
          ctx: e.target.getContext('2d'),
          options,
          x: e.offsetX,
          y: e.offsetY
        })),
        pairwise(),
        takeUntil(mouseUp$),
        takeUntil(mouseOut$)
      )
    )
  )
  .subscribe(pair => {
    const [from, to] = pair;
    const ctx = from.ctx;

    const options = from.options;

    ctx.strokeStyle = options.strokeStyle;
    ctx.lineWidth = options.lineWidth;

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  });

const rect = canvas.getBoundingClientRect();
const ctx = canvas.getContext('2d');
const scale = window.devicePixelRatio;
canvas.width = rect.width * scale;
canvas.height = rect.height * scale;
ctx.scale(scale, scale);
  }

  getInputStream(element:any) {
    return fromEvent(element, 'input').pipe(
      map((e:any) => e.target.value),
      startWith(element.value)
    );
  }
}
