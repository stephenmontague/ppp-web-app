"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GeneralProfileTab } from "@/components/dashboard/profile/general-profile-tab"
import { GolfStatsTab } from "@/components/dashboard/profile/golf-stats-tab"
import { PreferencesTab } from "@/components/dashboard/profile/preferences-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
	return (
		<div className='flex flex-col gap-6'>
			<DashboardHeader heading='Profile' text='Manage your account settings and preferences' />

			<Tabs defaultValue='general' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='general'>General</TabsTrigger>
					<TabsTrigger value='golf-stats'>Golf Stats</TabsTrigger>
					<TabsTrigger value='preferences'>Preferences</TabsTrigger>
				</TabsList>

				<TabsContent value='general'>
					<GeneralProfileTab />
				</TabsContent>

				<TabsContent value='golf-stats'>
					<GolfStatsTab />
				</TabsContent>

				<TabsContent value='preferences'>
					<PreferencesTab />
				</TabsContent>
			</Tabs>
		</div>
	)
}
