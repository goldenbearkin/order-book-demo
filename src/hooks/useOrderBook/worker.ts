// import { interval, timer } from "rxjs";

// self.onmessage = function (e) {
//   // console.log('Message received from main script');
//   // var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
//   // console.log('Posting message back to main script');
//   timer(1000, 1000).subscribe((x) => postMessage(x));
//   // postMessage(count);
// };

import { takeUntil, concatMap } from "rxjs/operators";
import { timer, Subject } from "rxjs";
import { ajax } from "rxjs/ajax";

const destory$ = new Subject();
const queryGithub = () => ajax.getJSON("https://api.github.com/users?per_page=5");

const longPolling = () =>
  timer(1000, 1000).pipe(
    concatMap(() => queryGithub()),
    takeUntil(destory$)
  );

addEventListener("message", ({ data }) => {
  switch (data) {
    case "start":
      console.log("start");
      longPolling().subscribe((value) => postMessage(value));
      break;
  }
});
