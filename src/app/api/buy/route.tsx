import { NextResponse } from "next/server";

import { bot } from '../../../bot';
import { CreateInvoiceLinkParams } from "gramio";

export async function GET(request: Request) {
    // Extract query parameter 'param' from the URL
    const url = new URL(request.url);
    const price = url.searchParams.get("price");

    // You can now use the `param` variable in your request
    if (!price) {
        return NextResponse.json({ message: "Missing param" }, { status: 400 });
    }

    const params: CreateInvoiceLinkParams = {
        title: 'AKATON',
        description: 'Bang',  // Use the query param in the description
        currency: 'XTR',
        prices: [{
            label: 'XTR',
            amount: parseInt(price)
        }],
        payload: JSON.stringify({ test: 'test' })
    };

    const link = await bot.api.createInvoiceLink(params);

    return NextResponse.json({ message: 'success', link });
}