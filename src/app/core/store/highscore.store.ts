import { Injectable } from "@angular/core";

@Injectable()
export class HighscoreStore {
    public getScore(): number {
        const cookie = document.cookie;
        const cookieParts = cookie.split(';');
        const highscoreCookie = cookieParts.find((part) => part.includes('highscore'));
        const highscore = highscoreCookie?.split('=')[1];

        if (highscore != undefined) {
            return parseInt(highscore, 10);
        }

        return 0;
    }

    public setScore(score: number): void {
        document.cookie = `highscore=${score}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }        
}