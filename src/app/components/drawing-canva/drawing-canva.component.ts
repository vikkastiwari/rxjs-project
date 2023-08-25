import { Component, OnInit } from '@angular/core';
import { fromEvent, map, pairwise, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'rxjs-drawing-canva',
  templateUrl: './drawing-canva.component.html',
  styleUrls: ['./drawing-canva.component.scss']
})
export class DrawingCanvaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const canvas = document.getElementById('canvas') as any;

    const mouseDown$ = fromEvent(canvas, 'mousedown');
    const mouseMove$ = fromEvent(canvas, 'mousemove');
    const mouseUp$ = fromEvent(canvas, 'mouseup');
    const mouseOut$ = fromEvent(canvas, 'mouseout');

    mouseDown$
      .pipe(
        switchMap(() =>
          mouseMove$.pipe(
            map((e:any) => ({
              ctx: e.target.getContext('2d'),
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

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      });

    const rect = canvas.getBoundingClientRect() as DOMRect;
    const ctx = canvas.getContext('2d');
    const scale = window.devicePixelRatio;
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    ctx.scale(scale, scale);

    // if (module.hot) {
    //   module.hot.dispose(function () {
    //     location.reload();
    //   });
    // }
  }
}
