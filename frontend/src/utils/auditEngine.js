/**
 * Audit Engine
 * 
 * This function takes an array of AI tools and checks them against 
 * some basic rules to find potential cost savings.
 * 
 * @param {Array} tools - The list of tools added by the user
 * @returns {Object} - An object containing the recommendations and calculated savings
 */
export const auditTools = (tools) => {
    const results = [];
    let totalMonthlySavings = 0;

    // Loop through each tool to analyze it
    tools.forEach((toolData) => {
        // If the tool entry is incomplete, we skip it
        if (!toolData.tool || !toolData.plan || !toolData.spend || !toolData.seats) {
            return;
        }

        // Ensure we are working with numbers
        const seats = Number(toolData.seats);
        const spend = Number(toolData.spend);

        let recommendation = null;
        let reason = '';
        let monthlySavings = 0;

        // Rule 1: Small teams shouldn't be on Team or Business plans
        // Usually, these plans require a minimum number of users and charge a premium.
        if (seats <= 2 && (toolData.plan === 'Team' || toolData.plan === 'Business')) {
            recommendation = `Downgrade ${toolData.tool} to a Pro/Individual plan`;
            reason = `Team and Business plans are generally not cost-effective for only ${seats} user(s). Individual plans provide similar core features.`;

            // We estimate a standard individual plan costs around $20/month
            const estimatedCheaperPlanCost = 20;
            monthlySavings = (spend - estimatedCheaperPlanCost) * seats;
        }

        // Rule 2: Suggest alternatives if paying for Enterprise with very few users
        else if (seats < 10 && toolData.plan === 'Enterprise') {
            recommendation = `Downgrade ${toolData.tool} from Enterprise to Team plan`;
            reason = `Enterprise plans are designed for large organizations. A Team plan should be sufficient for ${seats} users.`;

            // We estimate a Team plan is roughly half the cost of Enterprise
            const estimatedTeamPlanCost = spend * 0.5;
            monthlySavings = (spend - estimatedTeamPlanCost) * seats;
        }

        // Rule 3: Catch overly expensive single-user plans (e.g. paying $60+ for one user)
        else if (seats === 1 && spend >= 50 && toolData.plan !== 'Enterprise') {
            recommendation = `Evaluate cheaper alternatives for ${toolData.tool}`;
            reason = `You are paying $${spend}/month for a single user, which is higher than standard AI tools. Consider a standard $20/mo Pro tier.`;

            monthlySavings = spend - 20; // Savings compared to a standard $20 pro tier
        }

        // If we found a recommendation AND it actually saves money
        if (recommendation && monthlySavings > 0) {
            // Ensure savings is a clean integer
            monthlySavings = Math.round(monthlySavings);

            results.push({
                toolName: toolData.tool,
                currentPlan: toolData.plan,
                recommendation: recommendation,
                reason: reason,
                savings: monthlySavings
            });

            // Add to our running total
            totalMonthlySavings += monthlySavings;
        }
    });

    // Calculate yearly savings based on monthly
    const totalYearlySavings = totalMonthlySavings * 12;

    return {
        results: results,
        totalMonthlySavings: totalMonthlySavings,
        totalYearlySavings: totalYearlySavings
    };
};
