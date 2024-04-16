import { PiTelevisionSimpleFill, PiTelevisionSimple } from 'react-icons/pi';
export default function WatchedToggleButton() {
    return (
        <button className="ml-2">
            <PiTelevisionSimple className="text-xl" />
            <PiTelevisionSimpleFill className="text-xl" />
        </button>
    );
}
