export class Utils
{
    /**
     * Filter array by string
     *
     * @param mainArr
     * @param searchText
     * @returns {any}
     */
    public static filterArrayByString( mainArr: [], searchText: string ): any
    {
        if ( searchText === '' )
        {
            return mainArr;
        }

        return mainArr.filter(itemObj => {
            return this.searchInObj(itemObj, searchText.toLowerCase());
        });
    }

    /**
     * Search in object
     *
     * @param itemObj
     * @param searchText
     * @returns {boolean}
     */
    public static searchInObj(itemObj: any, searchText: string): any
    {
        for ( const prop in itemObj )
        {
            if ( !itemObj.hasOwnProperty(prop) )
            {
                continue;
            }

            const value: any = itemObj[prop];

            if ( typeof value === 'string' )
            {
                if ( this.searchInString(value, searchText) )
                {
                    return true;
                }
            }

            else if ( Array.isArray(value) )
            {
                if ( this.searchInArray(value, searchText) )
                {
                    return true;
                }
            }

            if ( typeof value === 'object' )
            {
                if ( this.searchInObj(value, searchText) )
                {
                    return true;
                }
            }
        }
    }

    /**
     * Search in array
     *
     * @param arr
     * @param searchText
     * @returns {boolean}
     */
    public static searchInArray(arr: any, searchText: string): any
    {
        for ( const value of arr )
        {
            if ( typeof value === 'string' )
            {
                if ( this.searchInString(value, searchText) )
                {
                    return true;
                }
            }

            if ( typeof value === 'object' )
            {
                if ( this.searchInObj(value, searchText) )
                {
                    return true;
                }
            }
        }
    }

    /**
     * Search in string
     *
     * @param value
     * @param searchText
     * @returns {any}
     */
    public static searchInString(value: string, searchText: string): any
    {
        return value.toLowerCase().includes(searchText);
    }

    /**
     * Generate a unique GUID
     *
     * @returns {string}
     */
    public static generateGUID(): string
    {
        function S4(): string
        {
            return Math.floor((1 + Math.random()) * 0x1000000)
                       .toString(16)
                       .substring(1);
        }

        return S4() + S4();
    }

    /**
     * Handleize
     *
     * @param text
     * @returns {string}
     */
    public static handleize( text: string ): string
    {
        return text.toString().toLowerCase()
                   .replace(/\s+/g, '-')           // Replace spaces with -
                   .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                   .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                   .replace(/^-+/, '')             // Trim - from start of text
                   .replace(/-+$/, '');            // Trim - from end of text
    }

    /**
     * Convert List to Array
     *
     * @param ObjectList
     * @returns Array
     */
    public static convert_to_array( objectData: any ) {
        const dataArray: any[] = [];
        if( objectData === null ) return [];
        Object.keys( objectData ).forEach( key => {
            const data = objectData[key];
            data.id = key;
            dataArray.push(data);
        });
        return dataArray;
    }

    public static toTimestamp( strDate: Date ) {
        return Date.parse( strDate.toISOString() ).toString();
    }

    public static generateCodeBilling( sequential_billing: number, store_code: string, character: string, len: number = 15 ) {
        let code: string = sequential_billing.toString();
        const header: string = store_code + character;
        for(; code.length < (len-(header.length));) {
            code = '0' + code;
        }
        return header+code;
    }

}
