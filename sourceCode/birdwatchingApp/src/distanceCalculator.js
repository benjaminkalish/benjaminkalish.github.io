export default function distanceCalculator(lat1, lng1, lat2, lng2, units){
            const p = 0.017453292519943295;    // Math.PI / 180
            const c = Math.cos;
            const a = 0.5 - c((lat2 - lat1) * p)/2 + 
                    c(lat1 * p) * c(lat2 * p) * 
                    (1 - c((lng2 - lng1) * p))/2;

            let coeficient = 1; // km
            if(units === 'miles'){
                coeficient = 0.62137119;
            }

          
            return 12742 * Math.asin(Math.sqrt(a)) * coeficient; // 2 * R; R = 6371 km
          }