import { Icon } from '@iconify/react';
import useTwitterStore from '../../store/store';

export default function Health(){
    let game_over = useTwitterStore((state) => state.game_over);
    const banned = useTwitterStore((state) => state.banned);

    game_over = Math.max(game_over, 0);

    const h_amount = 3;
    let h_full = h_amount;
    h_full -= game_over;

    const b_amount = 3;
    let b_full = b_amount;
    b_full -= banned;


    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row">
                {
                Array.from({ length: h_full }).map((_, i) => (
                        <Icon key={i} icon="twemoji:blue-heart" className="size-full w-12"/>
                ))
                }
                {
                Array.from({ length: h_amount-h_full }).map((_, i) => (
                        <Icon key={i} icon="twemoji:black-heart" className="size-full w-12"/>
                ))
                }
            </div>
            <div className="flex flex-row">
                {
                Array.from({ length: b_amount-b_full }).map((_, i) => (
                        <Icon key={i} icon="uiw:warning" className="size-full w-12 text-red-700"/>
                ))
                }
                {
                Array.from({ length: b_full }).map((_, i) => (
                        <Icon key={i} icon="uiw:warning" className="size-full w-12 text-gray-600"/>
                ))
                }
            </div>
      </div>
    )
}