import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { zodiacImg } from "@/assets";

export default function ZCard({ zodiac }) {
  return (
    <>
      <Dialog className="z-30">
        <DialogTrigger>
            <Card className="border border-primary-500/20 bg-primary-900/10 backdrop-blur-md transition-all duration-300 py-2 xl:py-4 hover:border-primary-950 z-30">
              <CardHeader>
                <CardTitle>
                  <img
                    src={zodiac.image ? zodiac.image : zodiacImg}
                    className="h-32 xl:h-48 xl:w-48 object-contain w-auto mx-auto"
                    alt={zodiac.name}
                    loading="lazy"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <h1 className="text-4xl xl:text-5xl italic mb-4">
                    {zodiac.name}
                  </h1>
                  <p className="text-gray-500">{zodiac.period}</p>
                </div>
              </CardContent>
            </Card>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="mb-2 text-lg">
              {zodiac.name}
              <span className="text-sm ml-1.5 text-gray-300">
                ( {zodiac.period} )
              </span>
            </DialogTitle>
            <DialogDescription>{zodiac.desc}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
